import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { IUserRepository, UserRepository } from '../application/repositories';
import {
  CreateUserUseCase,
  FindUserByEmailUseCase,
} from '../application/usecases';
import { IEnvConfig } from 'src/shared/infra/env-config';

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
    {
      provide: CreateUserUseCase.UseCase,
      useFactory: (
        userRepository: IUserRepository<UserEntity>,
        envConfig: IEnvConfig,
      ) => {
        return new CreateUserUseCase.UseCase(userRepository, envConfig);
      },
      inject: [IUserRepository, IEnvConfig],
    },
    {
      provide: FindUserByEmailUseCase.UseCase,
      useFactory: (userRepository: IUserRepository<UserEntity>) => {
        return new FindUserByEmailUseCase.UseCase(userRepository);
      },
      inject: [IUserRepository],
    },
  ],
  exports: [
    IUserRepository,
    CreateUserUseCase.UseCase,
    FindUserByEmailUseCase.UseCase,
  ],
})
export class UsersModule {}
