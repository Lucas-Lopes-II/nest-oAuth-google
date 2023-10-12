import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { JWT } from './jwt.interface';
import { JWTProvider } from './jwt.provider';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_TOKEN,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    {
      provide: JWT.IJWTProvider,
      useFactory: (jwtService: JwtService) => {
        return new JWTProvider(jwtService);
      },
      inject: [JwtService],
    },
  ],
  exports: [JWT.IJWTProvider],
})
export class JWTModule {}
