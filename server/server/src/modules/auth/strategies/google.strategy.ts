import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from 'passport-google-oauth20';

export interface GoogleUser {
  googleId: string;
  email: string;
  name: string;
  avatarUrl: string | undefined;
}

interface GoogleProfile {
  id: string;
  displayName: string;
  emails: Array<{ value: string }>;
  photos: Array<{ value: string }>;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    const options: StrategyOptions = {
      clientID: configService.getOrThrow<string>('google.clientId'),
      clientSecret: configService.getOrThrow<string>('google.clientSecret'),
      callbackURL: configService.getOrThrow<string>('google.callbackUrl'),
      scope: ['email', 'profile'],
    };
    super(options);
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ): void {
    const user: GoogleUser = {
      googleId: profile.id,
      email: profile.emails?.[0]?.value,
      name: profile.displayName,
      avatarUrl: profile.photos?.[0]?.value,
    };
    done(null, user);
  }
}
