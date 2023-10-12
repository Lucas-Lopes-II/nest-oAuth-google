import { HttpException, HttpStatus } from '@nestjs/common';

import { randomUUID } from 'node:crypto';
import { IUserRepository } from '../repositories';
import { IEnvConfig } from '../../../shared/infra/env-config';
import { UserEntity } from './../../infra/entities/user.entity';
import { DefaultUseCase } from './../../../shared/application/usecases';

export namespace CreateUserUseCase {
  export type Input = {
    name: string;
    email: string;
  };

  export type Output = {
    name: string;
    email: string;
  };

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly userRepository: IUserRepository<UserEntity>,
      private readonly envConfig: IEnvConfig,
    ) {}

    async execute(input: Input): Promise<Output> {
      const emailExists = await this.userRepository.emailExists(input?.email);
      if (emailExists) {
        throw new HttpException(
          'Já há cadastro com esse email',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const userEntity = await this.userRepository.create({
        ...input,
        id: randomUUID(),
      });

      return {
        email: userEntity.email,
        name: userEntity.name,
      };
    }
  }
}
