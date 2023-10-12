export abstract class IEnvConfig {
  abstract getAppPort(): number;
  abstract getNodeEnv(): string;
  abstract getSecretToken(): string;
  abstract getUrl(): string;
  abstract getClientUrl(): string;
  abstract getGoogleClientId(): string;
  abstract getGoogleClientSecret(): string;
}
