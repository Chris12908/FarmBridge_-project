import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { RegisterBuyerDto } from './dto/register-buyer.dto';
import { RegisterFarmerDto } from './dto/register-farmer.dto';
import { CompleteFarmerProfileDto } from './dto/complete-farmer-profile.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleUser } from './strategies/google.strategy';
import { Role } from '@prisma-client';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  phoneNumber: string | null;
  avatarUrl: string | null;
  isVerified: boolean;
  createdAt: Date;
}

export interface AuthResponse extends AuthTokens {
  user: AuthUser;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  private get frontendUrl(): string {
    return (
      this.configService.get<string>('app.frontendUrl') ||
      process.env.FRONTEND_URL ||
      ''
    );
  }

  // ─── Registration ───────────────────────────────────────────────────────────

  async registerBuyer(dto: RegisterBuyerDto): Promise<AuthResponse> {
    await this.assertEmailAvailable(dto.email);
    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        name: dto.name,
        phoneNumber: dto.phoneNumber,
        role: Role.BUYER,
        buyerProfile: { create: {} },
      },
    });

    const verificationToken = await this.createEmailVerification(user.id);

    // Queue welcome + verification emails
    await this.emailService.queueEmail('welcome-buyer', {
      to: user.email,
      context: { name: user.name },
    });
    await this.emailService.queueEmail('email-verification', {
      to: user.email,
      context: {
        name: user.name,
        ctaUrl: `${this.frontendUrl}/auth/verify-email?token=${verificationToken}`,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phoneNumber: user.phoneNumber ?? null,
        avatarUrl: user.avatarUrl ?? null,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    };
  }

  async registerFarmer(dto: RegisterFarmerDto): Promise<AuthResponse> {
    await this.assertEmailAvailable(dto.email);
    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        name: dto.name,
        phoneNumber: dto.phoneNumber,
        role: Role.FARMER,
        farmerProfile: {
          create: {
            ...(dto.farmName && { farmName: dto.farmName }),
            ...(dto.farmLocation && { farmLocation: dto.farmLocation }),
            ...(dto.farmName && dto.farmLocation && { profileComplete: true }),
          },
        },
      },
    });

    const verificationToken = await this.createEmailVerification(user.id);

    // Queue welcome + verification emails
    await this.emailService.queueEmail('welcome-farmer', {
      to: user.email,
      context: { name: user.name },
    });
    await this.emailService.queueEmail('email-verification', {
      to: user.email,
      context: {
        name: user.name,
        ctaUrl: `${this.frontendUrl}/auth/verify-email?token=${verificationToken}`,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phoneNumber: user.phoneNumber ?? null,
        avatarUrl: user.avatarUrl ?? null,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    };
  }

  async completeFarmerProfile(
    userId: string,
    dto: CompleteFarmerProfileDto,
  ): Promise<{ message: string }> {
    await this.prisma.farmerProfile.update({
      where: { userId },
      data: {
        farmName: dto.farmName,
        farmLocation: dto.farmLocation,
        bio: dto.bio,
        latitude: dto.latitude,
        longitude: dto.longitude,
        crops: dto.crops ?? [],
        tags: dto.tags ?? [],
        profileComplete: true,
      },
    });
    return { message: 'Farmer profile completed successfully' };
  }

  // ─── Login ───────────────────────────────────────────────────────────────────

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (!user.isActive)
      throw new UnauthorizedException('Account is deactivated');

    const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatch)
      throw new UnauthorizedException('Invalid email or password');

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phoneNumber: user.phoneNumber,
        avatarUrl: user.avatarUrl,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    };
  }

  // ─── Google OAuth ────────────────────────────────────────────────────────────

  async googleAuth(googleUser: GoogleUser): Promise<AuthTokens> {
    let user = await this.prisma.user.findFirst({
      where: {
        OR: [{ googleId: googleUser.googleId }, { email: googleUser.email }],
      },
    });

    if (!user) {
      // New user via Google
      user = await this.prisma.user.create({
        data: {
          email: googleUser.email,
          googleId: googleUser.googleId,
          name: googleUser.name,
          avatarUrl: googleUser.avatarUrl,
          role: Role.BUYER,
          isVerified: true,
          buyerProfile: { create: {} },
        },
      });

      await this.emailService.queueEmail('welcome-buyer', {
        to: user.email,
        context: { name: user.name },
      });
    } else if (!user.googleId) {
      // Existing email user — link Google account
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: googleUser.googleId,
          avatarUrl: googleUser.avatarUrl ?? user.avatarUrl,
        },
      });
    }

    if (!user.isActive)
      throw new UnauthorizedException('Account is deactivated');

    return this.generateTokens(user.id, user.email, user.role);
  }

  // ─── Token Refresh ───────────────────────────────────────────────────────────

  async refresh(userId: string, rawRefreshToken: string): Promise<AuthTokens> {
    const tokenHash = this.hashToken(rawRefreshToken);

    const stored = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
    });

    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      // Token not found or revoked — possible theft, invalidate all user tokens
      await this.revokeAllUserTokens(userId);
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }

    if (stored.userId !== userId) {
      await this.revokeAllUserTokens(userId);
      throw new UnauthorizedException('Token mismatch detected');
    }

    // Revoke used token (rotation)
    await this.prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });
    return this.generateTokens(user.id, user.email, user.role);
  }

  // ─── Logout ──────────────────────────────────────────────────────────────────

  async logout(
    userId: string,
    rawRefreshToken?: string,
  ): Promise<{ message: string }> {
    if (rawRefreshToken) {
      const tokenHash = this.hashToken(rawRefreshToken);
      await this.prisma.refreshToken
        .update({ where: { tokenHash }, data: { revokedAt: new Date() } })
        .catch(() => {}); // Ignore if not found
    } else {
      await this.revokeAllUserTokens(userId);
    }
    return { message: 'Logged out successfully' };
  }

  // ─── Password Reset ───────────────────────────────────────────────────────────

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    // Always return success to prevent email enumeration
    if (!user)
      return { message: 'If that email exists, a reset link has been sent' };

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = this.hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.prisma.passwordReset.create({
      data: { userId: user.id, tokenHash, expiresAt },
    });

    await this.emailService.queueEmail('password-reset', {
      to: email,
      context: {
        name: user.name,
        ctaUrl: `${this.frontendUrl}/auth/reset-password?token=${rawToken}`,
      },
    });

    return { message: 'If that email exists, a reset link has been sent' };
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const tokenHash = this.hashToken(token);
    const reset = await this.prisma.passwordReset.findUnique({
      where: { tokenHash },
    });

    if (!reset) throw new BadRequestException('Invalid or expired reset token');
    if (reset.usedAt)
      throw new BadRequestException('Reset token has already been used');
    if (reset.expiresAt < new Date())
      throw new BadRequestException('Reset token has expired');

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await this.prisma.$transaction([
      this.prisma.passwordReset.update({
        where: { id: reset.id },
        data: { usedAt: new Date() },
      }),
      this.prisma.user.update({
        where: { id: reset.userId },
        data: { passwordHash },
      }),
    ]);

    await this.revokeAllUserTokens(reset.userId);

    return { message: 'Password reset successfully' };
  }

  // ─── Email Verification ───────────────────────────────────────────────────────

  async verifyEmail(token: string): Promise<{ message: string }> {
    const verification = await this.prisma.emailVerification.findUnique({
      where: { token },
    });

    if (!verification)
      throw new BadRequestException('Invalid verification token');
    if (verification.usedAt)
      throw new BadRequestException('Token already used');
    if (verification.expiresAt < new Date())
      throw new BadRequestException('Token expired');

    await this.prisma.$transaction([
      this.prisma.emailVerification.update({
        where: { id: verification.id },
        data: { usedAt: new Date() },
      }),
      this.prisma.user.update({
        where: { id: verification.userId },
        data: { isVerified: true },
      }),
    ]);

    return { message: 'Email verified successfully' };
  }

  // ─── Get Me ──────────────────────────────────────────────────────────────────

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phoneNumber: true,
        avatarUrl: true,
        isVerified: true,
        createdAt: true,
        farmerProfile: true,
        buyerProfile: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // ─── Private Helpers ─────────────────────────────────────────────────────────

  private async generateTokens(
    userId: string,
    email: string,
    role: Role,
  ): Promise<AuthTokens> {
    const payload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('jwt.accessSecret'),
        expiresIn: this.configService.get('jwt.accessExpiry', '15m'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('jwt.refreshSecret'),
        expiresIn: this.configService.get('jwt.refreshExpiry', '30d'),
      }),
    ]);

    const tokenHash = this.hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await this.prisma.refreshToken.create({
      data: { userId, tokenHash, expiresAt },
    });

    return { accessToken, refreshToken };
  }

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private async revokeAllUserTokens(userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  private async assertEmailAvailable(email: string): Promise<void> {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('Email already in use');
  }

  private async createEmailVerification(userId: string): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await this.prisma.emailVerification.create({
      data: { userId, token, expiresAt },
    });
    return token;
  }
}
