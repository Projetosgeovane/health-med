import { ResourceNotFoundError } from '@enablers/core/errors';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FetchUsersByRoleUseCase } from 'src/modules/user/domain/application/use-cases/user/fetch-users-by-role.use-case';
import { UserPresenter } from '../../presenters/user.presenter';

@Controller()
export class FetchUsersByRoleController {
  constructor(
    private readonly fetchUsersByRoleUseCase: FetchUsersByRoleUseCase,
  ) { }

  @Get('users/role')
  @HttpCode(200)
  async handle(
    @Query('page', ParseIntPipe) page: number,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Query('role') role: string,
  ) {
    const result = await this.fetchUsersByRoleUseCase.execute({
      page,
      perPage,
      role,
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

    const users = result.value.users.map(UserPresenter.toHTTP);

    const totalRecords = result.value.totalRecords;

    return { users, totalRecords };
  }
}
