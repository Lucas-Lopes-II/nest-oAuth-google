import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthGoogleModule } from './auth-google/infra/auth-google.module';
import { UsersModule } from './users/infra/users.module';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
