import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';

import { ProfileOAuthGoogle } from '../dto';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import {
  CreateUserUseCase,
  FindUserByEmailUseCase,
} from '../../../users/application/usecases';
import { config } from 'dotenv';
config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  @Inject(FindUserByEmailUseCase.UseCase)
  private findUserByEmailUseCase: FindUserByEmailUseCase.UseCase;

  @Inject(CreateUserUseCase.UseCase)
  private createUserUseCase: CreateUserUseCase.UseCase;

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
    const user = await this.findUserByEmailUseCase.execute({
      email: profile.emails[0].value,
    });

    if (!user) {
      await this.createUserUseCase.execute({
        email: profile.emails[0].value,
        name: profile.displayName,
      });
    }

    return done(null, profile);
  }
}
