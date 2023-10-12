import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';

import { IEnvConfig } from '../../shared/infra/env-config';
import { GenerateJwtTokenUseCase } from '../application/usecases';
import { FindUserByEmailUseCase } from '../../users/application/usecases';

@Controller('auth')
export class AuthGoogleController {
  @Inject(FindUserByEmailUseCase.UseCase)
  private findUserByEmailUseCase: FindUserByEmailUseCase.UseCase;

  @Inject(GenerateJwtTokenUseCase.UseCase)
  private generateJwtTokenUseCase: GenerateJwtTokenUseCase.UseCase;

  @Inject(IEnvConfig)
  private envConfig: IEnvConfig;

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res) {
    const { id, email, name } = await this.findUserByEmailUseCase.execute({
      email: req.user.emails[0].value,
    });
    const { token } = await this.generateJwtTokenUseCase.execute({
      id,
      email,
      name,
    });

    return res.redirect(`${this.envConfig.getClientUrl()}/auth/${token}`);
  }
}
