import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtPayload } from '../../common/types/jwt-payload.type';

@ApiTags('messages')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('negotiations/:sessionId/messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  @ApiOperation({ summary: 'Get messages for a session (cursor pagination)' })
  findBySession(
    @Param('sessionId') sessionId: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    return this.messagesService.findBySession(
      sessionId,
      cursor,
      limit ? Number(limit) : 20,
    );
  }

  @Patch('read')
  @ApiOperation({ summary: 'Mark all messages in session as read' })
  markRead(
    @Param('sessionId') sessionId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.messagesService.markRead(sessionId, user.sub, user.role);
  }
}
