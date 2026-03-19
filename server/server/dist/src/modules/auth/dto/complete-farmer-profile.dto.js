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
exports.CompleteFarmerProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CompleteFarmerProfileDto {
}
exports.CompleteFarmerProfileDto = CompleteFarmerProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sunrise Harvest Farm' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CompleteFarmerProfileDto.prototype, "farmName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nakuru, Kenya' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompleteFarmerProfileDto.prototype, "farmLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'We grow organic vegetables...' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CompleteFarmerProfileDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: -0.303, description: 'Latitude' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-90),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], CompleteFarmerProfileDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 36.08, description: 'Longitude' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-180),
    (0, class_validator_1.Max)(180),
    __metadata("design:type", Number)
], CompleteFarmerProfileDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['tomatoes', 'kale', 'carrots'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CompleteFarmerProfileDto.prototype, "crops", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['organic', 'fresh'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CompleteFarmerProfileDto.prototype, "tags", void 0);
//# sourceMappingURL=complete-farmer-profile.dto.js.map