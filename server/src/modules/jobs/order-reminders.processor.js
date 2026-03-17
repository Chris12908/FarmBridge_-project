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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRemindersProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const prisma_service_1 = require("../../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
const _prisma_client_1 = require("../../../generated/prisma/client");
let OrderRemindersProcessor = class OrderRemindersProcessor extends bullmq_1.WorkerHost {
    constructor(prisma, emailService) {
        super();
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async process(_job) {
        const cutoff = new Date();
        cutoff.setHours(cutoff.getHours() - 48);
        const stuckOrders = await this.prisma.order.findMany({
            where: {
                status: _prisma_client_1.OrderStatus.CONFIRMED,
                confirmedAt: { lt: cutoff },
            },
            include: {
                farmer: { select: { id: true, name: true, email: true } },
                session: { include: { product: { select: { name: true } } } },
            },
        });
        if (stuckOrders.length === 0)
            return;
        for (const order of stuckOrders) {
            await this.emailService.queueEmail('order-confirmed-farmer', {
                to: order.farmer.email,
                subject: 'Reminder: Order Awaiting Dispatch',
                context: {
                    name: order.farmer.name,
                    orderNumber: order.orderNumber,
                    productName: order.session.product.name,
                    quantity: order.quantity,
                    buyerName: 'Your buyer',
                    totalAmount: `$${Number(order.totalAmount).toFixed(2)}`,
                    ctaUrl: `${process.env.FRONTEND_URL}/farmer/orders/${order.id}`,
                },
            });
        }
        console.log(`Order reminders: sent reminders for ${stuckOrders.length} stuck orders`);
    }
};
exports.OrderRemindersProcessor = OrderRemindersProcessor;
exports.OrderRemindersProcessor = OrderRemindersProcessor = __decorate([
    (0, bullmq_1.Processor)('order-reminders'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], OrderRemindersProcessor);
//# sourceMappingURL=order-reminders.processor.js.map