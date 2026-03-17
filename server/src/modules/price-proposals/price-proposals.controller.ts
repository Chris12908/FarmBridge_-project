import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PriceProposalsService } from './price-proposals.service';
import { CreatePriceProposalDto } from './dto/create-price-proposal.dto';
import { RespondProposalDto } from './dto/respond-proposal.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtPayload } from '../../common/types/jwt-payload.type';

@ApiTags('price-proposals')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('negotiations/:sessionId/proposals')
export class PriceProposalsController {
  constructor(private proposalsService: PriceProposalsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all proposals for a session' })
  findBySession(@Param('sessionId') sessionId: string) {
    return this.proposalsService.findBySession(sessionId);
  }

  @Post()
  @ApiOperation({ summary: 'Send a price proposal' })
  create(
    @Param('sessionId') sessionId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreatePriceProposalDto,
  ) {
    return this.proposalsService.create(sessionId, user.sub, user.role, dto);
  }

  @Patch(':proposalId/respond')
  @ApiOperation({ summary: 'Accept or decline a price proposal' })
  respond(
    @Param('sessionId') sessionId: string,
    @Param('proposalId') proposalId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: RespondProposalDto,
  ) {
    return this.proposalsService.respond(
      sessionId,
      proposalId,
      user.sub,
      user.role,
      dto,
    );
  }
}
