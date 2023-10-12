import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ProfileOAuthGoogle } from '../dto';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      callbackURL: `${process.env.URL}/auth/google/callback`,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: ProfileOAuthGoogle,
    done: VerifyCallback,
  ) {
    console.log(profile);

    return done(null, profile);
  }
}
