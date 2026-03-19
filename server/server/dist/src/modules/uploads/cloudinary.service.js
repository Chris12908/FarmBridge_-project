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
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
let CloudinaryService = class CloudinaryService {
    constructor(configService) {
        this.configService = configService;
        cloudinary_1.v2.config({
            cloud_name: configService.getOrThrow('cloudinary.cloudName'),
            api_key: configService.getOrThrow('cloudinary.apiKey'),
            api_secret: configService.getOrThrow('cloudinary.apiSecret'),
        });
    }
    async uploadImage(file, folder) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                folder: `farm-bridge/${folder}`,
                resource_type: 'image',
                quality: 'auto',
                fetch_format: 'auto',
                width: 1200,
                crop: 'limit',
            }, (error, result) => {
                if (error || !result)
                    return reject(error instanceof Error
                        ? error
                        : new common_1.InternalServerErrorException('Upload failed'));
                resolve(result);
            });
            uploadStream.end(file.buffer);
        });
    }
    async uploadVoiceNote(file) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                folder: 'farm-bridge/voice-notes',
                resource_type: 'video',
                format: 'mp3',
            }, (error, result) => {
                if (error || !result)
                    return reject(error instanceof Error
                        ? error
                        : new common_1.InternalServerErrorException('Upload failed'));
                resolve(result);
            });
            uploadStream.end(file.buffer);
        });
    }
    async deleteFile(publicId, resourceType = 'image') {
        await cloudinary_1.v2.uploader.destroy(publicId, {
            resource_type: resourceType,
        });
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map