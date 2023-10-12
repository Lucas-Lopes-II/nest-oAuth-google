import { JWT } from '../../../shared/infra/jwt';
import { IEnvConfig } from '../../../shared/infra/env-config';
import { DefaultUseCase } from '../../../shared/application/usecases/default-usecase.interface';

export namespace GenerateJwtTokenUseCase {
  export type Payload = {
    sub: string;
    email: string;
    name: string;
    iat?: number;
    exp?: number;
  };

  export type Input = {
    id: string;
    email: string;
    name: string;
  };

  export type Output = {
    token: string;
  };

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly JWTProvider: JWT.IJWTProvider,
      private readonly envConfig: IEnvConfig,
    ) {}

    async execute(input: Input): Promise<Output> {
      const payload: Payload = {
        sub: input['id'],
        name: input['name'],
        email: input['email'],
      };
      const jwtToken = this.JWTProvider.sign(payload, {
        secret: this.envConfig.getSecretToken(),
        expiresIn: '1d',
      });

      return {
        token: jwtToken,
      };
    }
  }
}
