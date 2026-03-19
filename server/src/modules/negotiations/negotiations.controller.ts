import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NegotiationsService } from './negotiations.service';
import { CreateNegotiationDto } from './dto/create-negotiation.dto';
import { UpdateNegotiationStatusDto } from './dto/update-negotiation-status.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtPayload } from '../../common/types/jwt-payload.type';
import { NegotiationStatus } from '@prisma-client';

@ApiTags('negotiations')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('negotiations')
export class NegotiationsController {
  constructor(private negotiationsService: NegotiationsService) {}

  @Post()
  @ApiOperation({ summary: 'Start a negotiation session (buyer initiates)' })
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateNegotiationDto) {
    return this.negotiationsService.create(user.sub, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all negotiation sessions for current user' })
  findAll(
    @CurrentUser() user: JwtPayload,
    @Query('status') status?: NegotiationStatus,
  ) {
    return this.negotiationsService.findAllForUser(user.sub, user.role, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single negotiation session with messages' })
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.negotiationsService.findOne(id, user.sub);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update negotiation status' })
  updateStatus(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateNegotiationStatusDto,
  ) {
    return this.negotiationsService.updateStatus(id, user.sub, dto);
  }
}
