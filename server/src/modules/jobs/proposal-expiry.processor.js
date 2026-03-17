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
exports.ProposalExpiryProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const prisma_service_1 = require("../../prisma/prisma.service");
const _prisma_client_1 = require("../../../generated/prisma/client");
let ProposalExpiryProcessor = class ProposalExpiryProcessor extends bullmq_1.WorkerHost {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async process(_job) {
        const now = new Date();
        const result = await this.prisma.priceProposal.updateMany({
            where: {
                status: _prisma_client_1.ProposalStatus.PENDING,
                expiresAt: { lt: now },
            },
            data: { status: _prisma_client_1.ProposalStatus.EXPIRED },
        });
        if (result.count > 0) {
            console.log(`Proposal expiry: expired ${result.count} pending proposals`);
        }
    }
};
exports.ProposalExpiryProcessor = ProposalExpiryProcessor;
exports.ProposalExpiryProcessor = ProposalExpiryProcessor = __decorate([
    (0, bullmq_1.Processor)('proposal-expiry'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProposalExpiryProcessor);
//# sourceMappingURL=proposal-expiry.processor.js.map