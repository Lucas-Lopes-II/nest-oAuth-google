import { UserEntity } from './../../infra/entities/user.entity';
import { DefaultUseCase } from './../../../shared/application/usecases';
import { IUserRepository } from '../repositories';

export namespace FindUserByIdUseCase {
  export type Input = {
    email: string;
  };

  export type Output = UserEntity;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly userRepository: IUserRepository<UserEntity>) {}

    async execute(input: Input): Promise<Output> {
      return this.userRepository.findByEmail(input.email);
    }
  }
}
