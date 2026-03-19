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
exports.FlutterwaveWebhookController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const flutterwave_service_1 = require("./flutterwave.service");
const orders_service_1 = require("../orders/orders.service");
let FlutterwaveWebhookController = class FlutterwaveWebhookController {
    constructor(flutterwaveService, ordersService) {
        this.flutterwaveService = flutterwaveService;
        this.ordersService = ordersService;
    }
    async handleFlutterwaveWebhook(req, verifHash) {
        if (!this.flutterwaveService.verifyWebhookHash(verifHash)) {
            throw new common_1.BadRequestException('Invalid webhook hash');
        }
        const payload = req.body;
        const txId = payload?.data?.id;
        if (!txId) {
            throw new common_1.BadRequestException('Missing transaction ID');
        }
        const verification = await this.flutterwaveService.verifyTransaction(String(txId));
        if (verification?.data?.status === 'successful') {
            const txRef = typeof verification.data?.tx_ref === 'string'
                ? verification.data.tx_ref
                : '';
            if (txRef) {
                const order = await this.ordersService.findByFlutterwaveTxRef(txRef);
                if (order) {
                    await this.ordersService.confirmPayment(order.id);
                }
            }
        }
        return { received: true };
    }
};
exports.FlutterwaveWebhookController = FlutterwaveWebhookController;
__decorate([
    (0, common_1.Post)('flutterwave'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)('verif-hash')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FlutterwaveWebhookController.prototype, "handleFlutterwaveWebhook", null);
exports.FlutterwaveWebhookController = FlutterwaveWebhookController = __decorate([
    (0, common_1.Controller)('webhooks'),
    __metadata("design:paramtypes", [flutterwave_service_1.FlutterwaveService,
        orders_service_1.OrdersService])
], FlutterwaveWebhookController);
//# sourceMappingURL=flutterwave.webhook.controller.js.map