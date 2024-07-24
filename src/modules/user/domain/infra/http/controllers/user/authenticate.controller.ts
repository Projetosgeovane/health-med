import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WrongCredentialsError } from 'src/modules/user/domain/application/use-cases/errors/wrong-credentials-error';
import { AuthenticateUseCase } from 'src/modules/user/domain/application/use-cases/user/authenticate.use-case';

@Controller()
export class AuthenticateController {
  constructor(
    private readonly jwt: JwtService,
    private readonly authenticateUseCase: AuthenticateUseCase,
  ) { }

  @Post('/authenticate')
  async handle(@Body() body: any) {
    const { email, password } = body;

    const result = await this.authenticateUseCase.execute({
      email,
      password,
    });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const accessToken = this.jwt.sign({ email });

    return { accessToken: accessToken };
  }
}
