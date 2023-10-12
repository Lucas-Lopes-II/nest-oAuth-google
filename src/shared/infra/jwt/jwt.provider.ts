import { JwtService } from '@nestjs/jwt';
import { JWT } from './jwt.interface';

export class JWTProvider implements JWT.IJWTProvider {
  constructor(private readonly jwtService: JwtService) {}

  verify<T extends object = any>(
    token: string,
    options?: JWT.VerifyOptions,
  ): T {
    return this.jwtService.verify(token, options);
  }

  verifyAsync<T extends object = any>(
    token: string,
    options?: JWT.VerifyOptions,
  ): Promise<T> {
    return this.jwtService.verifyAsync(token, options);
  }

  decode(
    token: string,
    options?: JWT.DecodeOptions,
  ): string | { [key: string]: any } {
    return this.jwtService.decode(token, options);
  }

  sign(payload: string, options: JWT.jwtOptions) {
    return this.jwtService.sign(payload, options);
  }
}
