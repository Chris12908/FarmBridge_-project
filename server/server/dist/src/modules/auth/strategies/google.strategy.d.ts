import { ConfigService } from '@nestjs/config';
import { VerifyCallback } from 'passport-google-oauth20';
export interface GoogleUser {
    googleId: string;
    email: string;
    name: string;
    avatarUrl: string | undefined;
}
interface GoogleProfile {
    id: string;
    displayName: string;
    emails: Array<{
        value: string;
    }>;
    photos: Array<{
        value: string;
    }>;
}
declare const GoogleStrategy_base: any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor(configService: ConfigService);
    validate(_accessToken: string, _refreshToken: string, profile: GoogleProfile, done: VerifyCallback): void;
}
export {};
