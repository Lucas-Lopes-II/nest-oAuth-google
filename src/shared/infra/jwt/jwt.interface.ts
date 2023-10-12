export namespace JWT {
  export abstract class IJWTProvider {
    abstract sign(
      payload: string | Buffer | object,
      options: jwtOptions | SignOptions,
    );
    abstract verify<T extends object = any>(
      token: string,
      options?: VerifyOptions,
    ): T;
    abstract verifyAsync<T extends object = any>(
      token: string,
      options?: VerifyOptions,
    ): Promise<T>;
    abstract decode(
      token: string,
      options?: DecodeOptions,
    ):
      | null
      | {
          [key: string]: any;
        }
      | string;
  }

  type Secret = string | Buffer | { key: string | Buffer; passphrase: string };

  export type jwtOptions = { secret?: string | Buffer; privateKey?: Secret };

  export interface SignOptions {
    algorithm?: Algorithm | undefined;
    keyid?: string | undefined;
    expiresIn?: string | number | undefined;
    notBefore?: string | number | undefined;
    audience?: string | string[] | undefined;
    subject?: string | undefined;
    issuer?: string | undefined;
    jwtid?: string | undefined;
    mutatePayload?: boolean | undefined;
    noTimestamp?: boolean | undefined;
    encoding?: string | undefined;
    allowInsecureKeySizes?: boolean | undefined;
    allowInvalidAsymmetricKeyTypes?: boolean | undefined;
  }

  export type VerifyOptions = {
    secret?: string | Buffer;
    publicKey?: string | Buffer;
    algorithms?: Algorithm[] | undefined;
    audience?: string | RegExp | Array<string | RegExp> | undefined;
    clockTimestamp?: number | undefined;
    clockTolerance?: number | undefined;
    complete?: boolean | undefined;
    issuer?: string | string[] | undefined;
    ignoreExpiration?: boolean | undefined;
    ignoreNotBefore?: boolean | undefined;
    jwtid?: string | undefined;
    nonce?: string | undefined;
    subject?: string | undefined;
    maxAge?: string | number | undefined;
    allowInvalidAsymmetricKeyTypes?: boolean | undefined;
  };

  export type Algorithm =
    | 'HS256'
    | 'HS384'
    | 'HS512'
    | 'RS256'
    | 'RS384'
    | 'RS512'
    | 'ES256'
    | 'ES384'
    | 'ES512'
    | 'PS256'
    | 'PS384'
    | 'PS512'
    | 'none';

  export interface DecodeOptions {
    complete?: boolean | undefined;
    json?: boolean | undefined;
  }
}
