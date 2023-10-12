import { IEnvConfig } from './env-config.interface';
import { config } from 'dotenv';
config();

export class EnvConfig implements IEnvConfig {
  getAppPort(): number {
    return Number(process.env.PORT);
  }

  getNodeEnv(): string {
    return process.env.NODE_ENV.toString();
  }

  getSecretToken(): string {
    return process.env.SECRET_TOKEN.toString();
  }
}
