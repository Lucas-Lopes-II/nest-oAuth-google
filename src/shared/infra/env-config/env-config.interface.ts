export abstract class IEnvConfig {
  abstract getAppPort(): number;
  abstract getNodeEnv(): string;
  abstract getSecretToken(): string;
}
