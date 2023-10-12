import { IEnvConfig } from './env-config.interface';
import { config } from 'dotenv';
config();

export class EnvConfig implements IEnvConfig {
  getUrl(): string {
    return process.env.URL.toString();
  }
  getClientUrl(): string {
    return process.env.CLIENT_URL.toString();
  }

  getGoogleClientId(): string {
    return process.env.CLIENT_ID.toString();
  }

  getGoogleClientSecret(): string {
    return process.env.CLIENT_SECRET.toString();
  }

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
