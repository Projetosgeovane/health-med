import { ResourceExistsError } from '@enablers/core/errors';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateUseCase } from 'src/modules/user/domain/application/use-cases/user/authenticate.use-case';

@Controller()
export class AuthenticateController {
  constructor(
    private readonly jwt: JwtService,
    private readonly authenticateUseCase: AuthenticateUseCase,
  ) { }

  @Post('/authenticate')
  async handle(@Body() body: any) {
    const { email } = body;

    const result = await this.authenticateUseCase.execute({
      email,
    });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceExistsError: {
          throw new ConflictException(error.message);
        }
        default: {
          throw new BadRequestException();
        }
      }
    }

    const token = this.jwt.sign({ email });

    return token;
  }
}
