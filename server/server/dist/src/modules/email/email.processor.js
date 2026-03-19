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
exports.EmailProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const email_service_1 = require("./email.service");
let EmailProcessor = class EmailProcessor extends bullmq_1.WorkerHost {
    constructor(emailService) {
        super();
        this.emailService = emailService;
    }
    async process(job) {
        const { to, subject, context } = job.data;
        switch (job.name) {
            case 'welcome-buyer':
                await this.emailService.sendEmail(to, subject || 'Welcome to Farm-Bridge!', 'welcome-buyer', context);
                break;
            case 'welcome-farmer':
                await this.emailService.sendEmail(to, subject || 'Welcome to Farm-Bridge, Farmer!', 'welcome-farmer', context);
                break;
            case 'email-verification':
                await this.emailService.sendEmail(to, subject || 'Verify your Farm-Bridge email', 'email-verification', context);
                break;
            case 'password-reset':
                await this.emailService.sendEmail(to, subject || 'Reset your Farm-Bridge password', 'password-reset', context);
                break;
            case 'price-offer':
                await this.emailService.sendEmail(to, subject || 'New price offer on Farm-Bridge', 'price-offer', context);
                break;
            case 'offer-accepted':
                await this.emailService.sendEmail(to, subject || 'Your offer has been accepted!', 'offer-accepted', context);
                break;
            case 'order-confirmed-buyer':
                await this.emailService.sendEmail(to, subject || 'Order Confirmed - Farm-Bridge', 'order-confirmed-buyer', context);
                break;
            case 'order-confirmed-farmer':
                await this.emailService.sendEmail(to, subject || 'New Order Received - Farm-Bridge', 'order-confirmed-farmer', context);
                break;
            case 'order-dispatched':
                await this.emailService.sendEmail(to, subject || 'Your order has been dispatched!', 'order-dispatched', context);
                break;
            case 'listing-expiring':
                await this.emailService.sendEmail(to, subject || 'Your listing is expiring soon', 'listing-expiring', context);
                break;
            case 'review-request':
                await this.emailService.sendEmail(to, subject || 'How was your Farm-Bridge experience?', 'review-request', context);
                break;
            default:
                console.warn(`Unknown email job type: ${job.name}`);
        }
    }
};
exports.EmailProcessor = EmailProcessor;
exports.EmailProcessor = EmailProcessor = __decorate([
    (0, bullmq_1.Processor)('email-queue'),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], EmailProcessor);
//# sourceMappingURL=email.processor.js.map