import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterBuyerDto } from './dto/register-buyer.dto';
import { RegisterFarmerDto } from './dto/register-farmer.dto';
import { CompleteFarmerProfileDto } from './dto/complete-farmer-profile.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import {
  JwtPayload,
  JwtRefreshPayload,
} from '../../common/types/jwt-payload.type';
import { Role } from '@prisma-client';
import { GoogleUser } from './strategies/google.strategy';
import { ConfigService } from '@nestjs/config';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Public()
  @Throttle({ auth: { limit: 10, ttl: 60000 } })
  @Post('register/buyer')
  @ApiOperation({ summary: 'Register a new buyer account' })
  registerBuyer(@Body() dto: RegisterBuyerDto) {
    return this.authService.registerBuyer(dto);
  }

  @Public()
  @Throttle({ auth: { limit: 10, ttl: 60000 } })
  @Post('register/farmer')
  @ApiOperation({ summary: 'Register a new farmer account' })
  registerFarmer(@Body() dto: RegisterFarmerDto) {
    return this.authService.registerFarmer(dto);
  }

  @Post('farmer/complete-profile')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.FARMER)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Complete farmer profile after registration' })
  completeFarmerProfile(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CompleteFarmerProfileDto,
  ) {
    return this.authService.completeFarmerProfile(user.sub, dto);
  }

  @Public()
  @Throttle({ auth: { limit: 10, ttl: 60000 } })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Initiate Google OAuth flow' })
  googleAuth() {
    // Guard redirects to Google
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google OAuth callback' })
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const tokens = await this.authService.googleAuth(req.user as GoogleUser);
    const frontendUrl = this.configService.get<string>('app.frontendUrl');
    // Redirect with tokens as query params (frontend stores in memory/cookie)
    res.redirect(
      `${frontendUrl}/auth/callback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`,
    );
  }

  @Public()
  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  refresh(@CurrentUser() user: JwtRefreshPayload) {
    return this.authService.refresh(user.sub, user.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Logout — revokes the provided refresh token' })
  logout(@CurrentUser() user: JwtPayload, @Req() req: Request) {
    const authHeader = req.headers.authorization;
    const refreshToken = authHeader?.split(' ')[1];
    return this.authService.logout(user.sub, refreshToken);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send password reset email' })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password with token from email' })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.newPassword);
  }

  @Public()
  @Get('verify-email/:token')
  @ApiOperation({ summary: 'Verify email address' })
  verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get current authenticated user' })
  getMe(@CurrentUser() user: JwtPayload) {
    return this.authService.getMe(user.sub);
  }
}
