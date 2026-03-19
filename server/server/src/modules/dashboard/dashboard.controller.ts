import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtPayload } from '../../common/types/jwt-payload.type';
import { Role } from '@prisma-client';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('farmer')
  @Roles(Role.FARMER)
  getFarmerDashboard(@CurrentUser() user: JwtPayload) {
    return this.dashboardService.getFarmerDashboard(user.sub);
  }

  @Get('buyer')
  @Roles(Role.BUYER)
  getBuyerDashboard(@CurrentUser() user: JwtPayload) {
    return this.dashboardService.getBuyerDashboard(user.sub);
  }
}
