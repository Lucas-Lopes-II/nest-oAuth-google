import { Module } from '@nestjs/common';

import { AuthGoogleController } from './auth-google.controller';
import { GoogleStrategy } from '../application/strategies';

@Module({
  controllers: [AuthGoogleController],
  providers: [GoogleStrategy],
})
export class AuthGoogleModule {}
