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
exports.RegisterFarmerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RegisterFarmerDto {
}
exports.RegisterFarmerDto = RegisterFarmerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Farmer' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], RegisterFarmerDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john@farm.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterFarmerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SecurePass123!', minLength: 8 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/(?=.*[A-Z])(?=.*[0-9])/, {
        message: 'Password must contain at least one uppercase letter and one number',
    }),
    __metadata("design:type", String)
], RegisterFarmerDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFarmerDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sunrise Harvest Farm', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], RegisterFarmerDto.prototype, "farmName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Kigali, Rwanda', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterFarmerDto.prototype, "farmLocation", void 0);
//# sourceMappingURL=register-farmer.dto.js.map