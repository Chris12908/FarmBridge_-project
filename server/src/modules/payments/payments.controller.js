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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const stripe_service_1 = require("./stripe.service");
const flutterwave_service_1 = require("./flutterwave.service");
const orders_service_1 = require("../orders/orders.service");
const _prisma_client_1 = require("../../../generated/prisma/client");
let PaymentsController = class PaymentsController {
    constructor(stripeService, flutterwaveService, ordersService) {
        this.stripeService = stripeService;
        this.flutterwaveService = flutterwaveService;
        this.ordersService = ordersService;
    }
    async initiateStripe(user, body) {
        const order = await this.ordersService.findOne(body.orderId, user.sub);
        const { clientSecret, paymentIntentId } = await this.stripeService.createPaymentIntent(order.id, Number(order.totalAmount), 'usd', { buyerId: user.sub, orderNumber: order.orderNumber });
        await this.ordersService.saveStripePaymentIntent(order.id, paymentIntentId);
        return { clientSecret, paymentIntentId, orderId: order.id };
    }
    async initiateFlutterwave(user, body) {
        const order = await this.ordersService.findOne(body.orderId, user.sub);
        const txRef = `FW-${order.orderNumber}-${Date.now()}`;
        const result = await this.flutterwaveService.initiateMobileMoney(body.phoneNumber, Number(order.totalAmount), 'KES', txRef, 'mpesa', user.email);
        await this.ordersService.saveFlutterwaveTxRef(order.id, txRef);
        return { result, txRef, orderId: order.id };
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)('stripe/initiate'),
    (0, roles_decorator_1.Roles)(_prisma_client_1.Role.BUYER),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "initiateStripe", null);
__decorate([
    (0, common_1.Post)('flutterwave/initiate'),
    (0, roles_decorator_1.Roles)(_prisma_client_1.Role.BUYER),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "initiateFlutterwave", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)('payments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [stripe_service_1.StripeService,
        flutterwave_service_1.FlutterwaveService,
        orders_service_1.OrdersService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map