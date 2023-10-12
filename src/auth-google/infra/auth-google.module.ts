import { Module } from '@nestjs/common';

import { AuthGoogleController } from './auth-google.controller';

@Module({
  controllers: [AuthGoogleController],
  providers: [],
})
export class AuthGoogleModule {}
