import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FarmerProfilesService } from './farmer-profiles.service';
import { UpdateFarmerProfileDto } from './dto/update-farmer-profile.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { JwtPayload } from '../../common/types/jwt-payload.type';
import { Role } from '@prisma-client';

@ApiTags('farmers')
@Controller('farmers')
export class FarmerProfilesController {
  constructor(private farmerProfilesService: FarmerProfilesService) {}

  @Public()
  @Get('featured')
  @ApiOperation({ summary: 'Get featured farmers' })
  getFeatured() {
    return this.farmerProfilesService.getFeatured();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get public farmer profile' })
  getProfile(@Param('id') id: string) {
    return this.farmerProfilesService.findPublicProfile(id);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.FARMER)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update own farmer profile' })
  updateProfile(
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateFarmerProfileDto,
  ) {
    return this.farmerProfilesService.update(user.sub, dto);
  }
}
