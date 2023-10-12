import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { IUserRepository, UserRepository } from '../application/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    {
      provide: IUserRepository,
      useFactory: (dataSource: DataSource) => {
        return UserRepository.createInstance(
          dataSource.getRepository(UserEntity),
        );
      },
      inject: [getDataSourceToken()],
    },
  ],
  exports: [IUserRepository],
})
export class UsersModule {}
