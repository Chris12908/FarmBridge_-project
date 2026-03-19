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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlutterwaveService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Flutterwave = require('flutterwave-node-v3');
let FlutterwaveService = class FlutterwaveService {
    constructor(configService) {
        this.configService = configService;
        const secretKey = this.configService.getOrThrow('flutterwave.secretKey');
        this.flw = new Flutterwave(secretKey, secretKey);
    }
    initiateMobileMoney(phone, amount, currency, txRef, provider, customerEmail) {
        const payload = {
            phone_number: phone,
            amount,
            currency,
            tx_ref: txRef,
            email: customerEmail,
        };
        if (currency === 'KES' || provider === 'mpesa') {
            return this.flw.MobileMoney.mpesa(payload);
        }
        else if (currency === 'GHS' || provider === 'mtn') {
            return this.flw.MobileMoney.ghana(payload);
        }
        else {
            return this.flw.MobileMoney.franco_phone(payload);
        }
    }
    verifyWebhookHash(hash) {
        const expectedHash = this.configService.get('flutterwave.webhookHash');
        return hash === expectedHash;
    }
    verifyTransaction(txId) {
        return this.flw.Transaction.verify({ id: txId });
    }
};
exports.FlutterwaveService = FlutterwaveService;
exports.FlutterwaveService = FlutterwaveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], FlutterwaveService);
//# sourceMappingURL=flutterwave.service.js.map