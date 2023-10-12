import { Module } from '@nestjs/common';

import { JWT, JWTModule } from './../../shared/infra/jwt';
import { GoogleStrategy } from '../application/strategies';
import { AuthGoogleController } from './auth-google.controller';
import { EnvConfigModule, IEnvConfig } from './../../shared/infra/env-config';
import { GenerateJwtTokenUseCase } from '../application/usecases';

@Module({
  imports: [JWTModule, EnvConfigModule],
  controllers: [AuthGoogleController],
  providers: [
    GoogleStrategy,
    {
      provide: GenerateJwtTokenUseCase.UseCase,
      useFactory: (JWTProvider: JWT.IJWTProvider, envConfig: IEnvConfig) => {
        return new GenerateJwtTokenUseCase.UseCase(JWTProvider, envConfig);
      },
      inject: [JWT.IJWTProvider, IEnvConfig],
    },
  ],
})
export class AuthGoogleModule {}
