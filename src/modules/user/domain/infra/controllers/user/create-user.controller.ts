import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../../application/use-cases/user/create-user.use-case';
import { CreateUserDTO } from '../../dtos/user/create-user.dto';
import { ResourceExistsError } from 'libs/core/src/errors';

@Controller()
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) { }

  @Post('user')
  async handle(@Body() body: CreateUserDTO) {
    const { name, email, password, crm, cpf } = body;

    const result = await this.createUserUseCase.execute({
      name,
      email,
      password,
      crm,
      cpf,
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
  }
}
