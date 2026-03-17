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
exports.ListingCleanupProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const prisma_service_1 = require("../../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
const _prisma_client_1 = require("../../../generated/prisma/client");
let ListingCleanupProcessor = class ListingCleanupProcessor extends bullmq_1.WorkerHost {
    constructor(prisma, emailService) {
        super();
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async process(_job) {
        const now = new Date();
        const expiredProducts = await this.prisma.product.findMany({
            where: {
                status: _prisma_client_1.ListingStatus.ACTIVE,
                expiresAt: { lt: now },
            },
            include: {
                farmer: { select: { id: true, name: true, email: true } },
            },
        });
        if (expiredProducts.length === 0)
            return;
        await this.prisma.product.updateMany({
            where: {
                id: { in: expiredProducts.map((p) => p.id) },
            },
            data: { status: _prisma_client_1.ListingStatus.EXPIRED },
        });
        for (const product of expiredProducts) {
            await this.emailService.queueEmail('listing-expiring', {
                to: product.farmer.email,
                context: {
                    name: product.farmer.name,
                    productName: product.name,
                    expiresAt: product.expiresAt?.toLocaleDateString() ?? 'N/A',
                    ctaUrl: `${process.env.FRONTEND_URL}/farmer/listings/${product.id}/edit`,
                },
            });
        }
        console.log(`Listing cleanup: expired ${expiredProducts.length} products`);
    }
};
exports.ListingCleanupProcessor = ListingCleanupProcessor;
exports.ListingCleanupProcessor = ListingCleanupProcessor = __decorate([
    (0, bullmq_1.Processor)('listing-cleanup'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], ListingCleanupProcessor);
//# sourceMappingURL=listing-cleanup.processor.js.map