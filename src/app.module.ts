import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/infra/users.module';
import { AuthGoogleModule } from './auth-google/infra/auth-google.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    AuthGoogleModule,
    UsersModule,
  ],
})
export class AppModule {}
