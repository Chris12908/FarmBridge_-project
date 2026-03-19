import {
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtPayload } from '../../common/types/jwt-payload.type';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(
    @CurrentUser() user: JwtPayload,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('unreadOnly') unreadOnly = false,
  ) {
    return this.notificationsService.findAll(
      user.sub,
      +page,
      +limit,
      Boolean(unreadOnly),
    );
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.notificationsService.markRead(id, user.sub);
  }

  @Patch('read-all')
  markAllRead(@CurrentUser() user: JwtPayload) {
    return this.notificationsService.markAllRead(user.sub);
  }

  @Post('device-token')
  registerDeviceToken(
    @CurrentUser() user: JwtPayload,
    @Body() body: { token: string; platform: string },
  ) {
    return this.notificationsService.registerDeviceToken(
      user.sub,
      body.token,
      body.platform,
    );
  }
}
