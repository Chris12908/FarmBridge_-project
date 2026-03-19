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
exports.CreateAddressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAddressDto {
}
exports.CreateAddressDto = CreateAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Home' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Main Street' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nairobi' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nairobi County' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Kenya' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: '00100' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAddressDto.prototype, "isDefault", void 0);
//# sourceMappingURL=create-address.dto.js.map