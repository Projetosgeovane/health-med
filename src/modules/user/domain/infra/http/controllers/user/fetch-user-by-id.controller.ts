import { ResourceNotFoundError } from '@enablers/core/errors';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { UserPresenter } from '../../presenters/user.presenter';
import { FetchUserByIdUseCase } from 'src/modules/user/domain/application/use-cases/user/fetch-user-by-id.use-case';

@Controller('user/:id')
export class FetchUserByIdController {
  constructor(private readonly fetchUserByIdUseCase: FetchUserByIdUseCase) { }

  @Get()
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    const result = await this.fetchUserByIdUseCase.execute({
      userID: id,
    });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException();
      }
    }

    const user = UserPresenter.toHTTP(result.value.user);

    return { user };
  }
}
