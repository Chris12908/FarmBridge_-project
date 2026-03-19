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
exports.JobsModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const listing_cleanup_processor_1 = require("./listing-cleanup.processor");
const order_reminders_processor_1 = require("./order-reminders.processor");
const proposal_expiry_processor_1 = require("./proposal-expiry.processor");
const email_module_1 = require("../email/email.module");
let JobsModule = class JobsModule {
    constructor(listingCleanupQueue, orderRemindersQueue, proposalExpiryQueue) {
        this.listingCleanupQueue = listingCleanupQueue;
        this.orderRemindersQueue = orderRemindersQueue;
        this.proposalExpiryQueue = proposalExpiryQueue;
    }
    async onApplicationBootstrap() {
        const cleanupJobs = await this.listingCleanupQueue.getRepeatableJobs();
        for (const job of cleanupJobs) {
            await this.listingCleanupQueue.removeRepeatableByKey(job.key);
        }
        const reminderJobs = await this.orderRemindersQueue.getRepeatableJobs();
        for (const job of reminderJobs) {
            await this.orderRemindersQueue.removeRepeatableByKey(job.key);
        }
        const expiryJobs = await this.proposalExpiryQueue.getRepeatableJobs();
        for (const job of expiryJobs) {
            await this.proposalExpiryQueue.removeRepeatableByKey(job.key);
        }
        await this.listingCleanupQueue.add('run-cleanup', {}, { repeat: { pattern: '0 0 * * *' } });
        await this.orderRemindersQueue.add('send-reminders', {}, { repeat: { pattern: '0 8 * * *' } });
        await this.proposalExpiryQueue.add('expire-proposals', {}, { repeat: { pattern: '0 * * * *' } });
        console.log('Background jobs registered: listing-cleanup (midnight), order-reminders (8am), proposal-expiry (hourly)');
    }
};
exports.JobsModule = JobsModule;
exports.JobsModule = JobsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bullmq_1.BullModule.registerQueue({ name: 'listing-cleanup' }, { name: 'order-reminders' }, { name: 'proposal-expiry' }),
            email_module_1.EmailModule,
        ],
        providers: [
            listing_cleanup_processor_1.ListingCleanupProcessor,
            order_reminders_processor_1.OrderRemindersProcessor,
            proposal_expiry_processor_1.ProposalExpiryProcessor,
        ],
    }),
    __param(0, (0, bullmq_1.InjectQueue)('listing-cleanup')),
    __param(1, (0, bullmq_1.InjectQueue)('order-reminders')),
    __param(2, (0, bullmq_1.InjectQueue)('proposal-expiry')),
    __metadata("design:paramtypes", [bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue])
], JobsModule);
//# sourceMappingURL=jobs.module.js.map