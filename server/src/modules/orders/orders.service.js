"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const prisma_service_1 = require("../../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
const email_service_1 = require("../email/email.service");
const _prisma_client_1 = require("../../../generated/prisma/client");
const ioredis_1 = __importDefault(require("ioredis"));
let OrdersService = class OrdersService {
    constructor(prisma, configService, notificationsService, emailService, orderRemindersQueue) {
        this.prisma = prisma;
        this.configService = configService;
        this.notificationsService = notificationsService;
        this.emailService = emailService;
        this.orderRemindersQueue = orderRemindersQueue;
        this.redis = new ioredis_1.default(this.configService.get('redis.url') || 'redis://localhost:6379');
    }
    async generateOrderNumber() {
        const year = new Date().getFullYear();
        const key = `order:counter:${year}`;
        const count = await this.redis.incr(key);
        return `#ORD-${year}-${String(count).padStart(3, '0')}`;
    }
    get frontendUrl() {
        return (this.configService.get('app.frontendUrl') ||
            process.env.FRONTEND_URL ||
            '');
    }
    async create(buyerId, dto) {
        const session = await this.prisma.negotiationSession.findUnique({
            where: { id: dto.sessionId },
            include: {
                product: true,
                buyer: true,
                farmer: true,
            },
        });
        if (!session)
            throw new common_1.NotFoundException('Negotiation session not found');
        if (session.buyerId !== buyerId)
            throw new common_1.ForbiddenException('Not authorized');
        if (session.status !== _prisma_client_1.NegotiationStatus.BUYER_APPROVED) {
            throw new common_1.BadRequestException('Session must be in BUYER_APPROVED status to create an order');
        }
        if (!session.agreedPrice || !session.agreedQuantity) {
            throw new common_1.BadRequestException('Session is missing agreed price or quantity');
        }
        const product = session.product;
        if (product.quantityAvailable < session.agreedQuantity) {
            throw new common_1.BadRequestException('Insufficient product quantity available');
        }
        let deliveryAddressSnapshot = {};
        if (dto.addressId) {
            const address = await this.prisma.address.findUnique({
                where: { id: dto.addressId },
            });
            if (!address || address.userId !== buyerId) {
                throw new common_1.BadRequestException('Invalid delivery address');
            }
            deliveryAddressSnapshot = {
                label: address.label,
                street: address.street,
                city: address.city,
                state: address.state,
                country: address.country,
                postalCode: address.postalCode,
            };
        }
        const agreedPrice = Number(session.agreedPrice);
        const quantity = session.agreedQuantity;
        const subtotal = agreedPrice * quantity;
        const platformFee = subtotal * 0.05;
        const totalAmount = subtotal + platformFee;
        const orderNumber = await this.generateOrderNumber();
        const order = await this.prisma.order.create({
            data: {
                orderNumber,
                sessionId: session.id,
                buyerId,
                farmerId: session.farmerId,
                addressId: dto.addressId,
                deliveryAddressSnapshot,
                quantity,
                pricePerUnit: agreedPrice,
                subtotal,
                platformFee,
                totalAmount,
                status: _prisma_client_1.OrderStatus.PENDING,
                paymentMethod: dto.paymentMethod,
                paymentStatus: _prisma_client_1.PaymentStatus.PENDING,
                ...(dto.deliveryDate && { deliveryDate: new Date(dto.deliveryDate) }),
            },
            include: {
                buyer: { select: { id: true, name: true, email: true } },
                farmer: { select: { id: true, name: true, email: true } },
                session: { include: { product: true } },
            },
        });
        await this.prisma.negotiationSession.update({
            where: { id: session.id },
            data: { status: _prisma_client_1.NegotiationStatus.CHECKED_OUT },
        });
        return order;
    }
    async findAll(userId, role, query) {
        const { status, page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...(role === _prisma_client_1.Role.BUYER ? { buyerId: userId } : { farmerId: userId }),
            ...(status && { status }),
        };
        const [orders, total] = await Promise.all([
            this.prisma.order.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    buyer: { select: { id: true, name: true, avatarUrl: true } },
                    farmer: { select: { id: true, name: true, avatarUrl: true } },
                    session: {
                        include: {
                            product: { select: { id: true, name: true, images: true } },
                        },
                    },
                    address: true,
                },
            }),
            this.prisma.order.count({ where }),
        ]);
        return {
            data: orders,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findOne(id, userId) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                buyer: {
                    select: { id: true, name: true, email: true, avatarUrl: true },
                },
                farmer: {
                    select: { id: true, name: true, email: true, avatarUrl: true },
                },
                session: { include: { product: true } },
                address: true,
                review: true,
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.buyerId !== userId && order.farmerId !== userId) {
            throw new common_1.ForbiddenException('Not authorized to view this order');
        }
        return order;
    }
    async saveStripePaymentIntent(orderId, paymentIntentId) {
        return this.prisma.order.update({
            where: { id: orderId },
            data: { stripePaymentIntentId: paymentIntentId },
        });
    }
    async saveFlutterwaveTxRef(orderId, txRef) {
        return this.prisma.order.update({
            where: { id: orderId },
            data: { flutterwaveTxRef: txRef },
        });
    }
    async findByFlutterwaveTxRef(txRef) {
        return this.prisma.order.findFirst({
            where: { flutterwaveTxRef: txRef },
        });
    }
    async confirmPayment(orderId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                session: { include: { product: true } },
                buyer: { select: { id: true, name: true, email: true } },
                farmer: { select: { id: true, name: true, email: true } },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        await this.prisma.$transaction([
            this.prisma.order.update({
                where: { id: orderId },
                data: {
                    paymentStatus: _prisma_client_1.PaymentStatus.PAID,
                    status: _prisma_client_1.OrderStatus.CONFIRMED,
                    confirmedAt: new Date(),
                },
            }),
            this.prisma.product.update({
                where: { id: order.session.productId },
                data: { quantityAvailable: { decrement: order.quantity } },
            }),
        ]);
        const productName = order.session.product.name;
        await this.notificationsService.createAndDispatch(order.buyerId, {
            type: _prisma_client_1.NotificationType.ORDER_CONFIRMED,
            title: 'Order Confirmed!',
            body: `Your order for ${productName} has been confirmed. Payment received.`,
            data: { orderId },
        });
        await this.notificationsService.createAndDispatch(order.farmerId, {
            type: _prisma_client_1.NotificationType.PAYMENT_RECEIVED,
            title: 'Payment Received',
            body: `Payment confirmed for order ${order.orderNumber}. Please prepare for dispatch.`,
            data: { orderId },
        });
        await this.emailService.queueEmail('order-confirmed-buyer', {
            to: order.buyer.email,
            context: {
                name: order.buyer.name,
                orderNumber: order.orderNumber,
                productName,
                quantity: order.quantity,
                totalAmount: `$${Number(order.totalAmount).toFixed(2)}`,
                ctaUrl: `${this.frontendUrl}/buyer/orders/${orderId}`,
            },
        });
        await this.emailService.queueEmail('order-confirmed-farmer', {
            to: order.farmer.email,
            context: {
                name: order.farmer.name,
                orderNumber: order.orderNumber,
                productName,
                quantity: order.quantity,
                buyerName: order.buyer.name,
                totalAmount: `$${Number(order.totalAmount).toFixed(2)}`,
                ctaUrl: `${this.frontendUrl}/farmer/orders/${orderId}`,
            },
        });
        return this.prisma.order.findUnique({ where: { id: orderId } });
    }
    async failPayment(orderId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return this.prisma.order.update({
            where: { id: orderId },
            data: { paymentStatus: _prisma_client_1.PaymentStatus.FAILED },
        });
    }
    async updateStatus(id, farmerId, dto) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                buyer: { select: { id: true, name: true, email: true } },
                farmer: { select: { id: true, name: true, email: true } },
                session: { include: { product: { select: { name: true } } } },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.farmerId !== farmerId) {
            throw new common_1.ForbiddenException('Not authorized to update this order');
        }
        const validTransitions = {
            [_prisma_client_1.OrderStatus.CONFIRMED]: [_prisma_client_1.OrderStatus.DISPATCHED],
            [_prisma_client_1.OrderStatus.DISPATCHED]: [_prisma_client_1.OrderStatus.DELIVERED],
        };
        const allowedNext = validTransitions[order.status];
        if (!allowedNext || !allowedNext.includes(dto.status)) {
            throw new common_1.BadRequestException(`Cannot transition order from ${order.status} to ${dto.status}`);
        }
        const updateData = { status: dto.status };
        const productName = order.session.product.name;
        if (dto.status === _prisma_client_1.OrderStatus.DISPATCHED) {
            updateData.dispatchedAt = new Date();
            await this.notificationsService.createAndDispatch(order.buyerId, {
                type: _prisma_client_1.NotificationType.ORDER_DISPATCHED,
                title: 'Order Dispatched!',
                body: `Your order for ${productName} is on its way!`,
                data: { orderId: id },
            });
            await this.emailService.queueEmail('order-dispatched', {
                to: order.buyer.email,
                context: {
                    name: order.buyer.name,
                    orderNumber: order.orderNumber,
                    productName,
                    quantity: order.quantity,
                    ctaUrl: `${this.frontendUrl}/buyer/orders/${id}`,
                },
            });
        }
        if (dto.status === _prisma_client_1.OrderStatus.DELIVERED) {
            updateData.deliveredAt = new Date();
            await this.prisma.farmerProfile.update({
                where: { userId: farmerId },
                data: { completedOrderCount: { increment: 1 } },
            });
            await this.prisma.negotiationSession.update({
                where: { id: order.sessionId },
                data: { status: _prisma_client_1.NegotiationStatus.FULFILLED },
            });
            await this.notificationsService.createAndDispatch(order.buyerId, {
                type: _prisma_client_1.NotificationType.ORDER_DELIVERED,
                title: 'Order Delivered!',
                body: `Your order for ${productName} has been delivered. Leave a review!`,
                data: { orderId: id },
            });
            await this.emailService.queueEmail('review-request', {
                to: order.buyer.email,
                context: {
                    name: order.buyer.name,
                    productName,
                    farmerName: order.farmer.name,
                    ctaUrl: `${this.frontendUrl}/buyer/orders/${id}`,
                },
            });
        }
        return this.prisma.order.update({
            where: { id },
            data: updateData,
        });
    }
    async cancel(id, userId) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.buyerId !== userId)
            throw new common_1.ForbiddenException('Not authorized');
        if (order.status !== _prisma_client_1.OrderStatus.PENDING) {
            throw new common_1.BadRequestException('Only PENDING orders can be cancelled');
        }
        return this.prisma.order.update({
            where: { id },
            data: { status: _prisma_client_1.OrderStatus.CANCELLED, cancelledAt: new Date() },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, bullmq_1.InjectQueue)('order-reminders')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        notifications_service_1.NotificationsService,
        email_service_1.EmailService,
        bullmq_2.Queue])
], OrdersService);
//# sourceMappingURL=orders.service.js.map