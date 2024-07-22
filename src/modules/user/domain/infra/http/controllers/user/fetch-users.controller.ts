import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FetchUsersUseCase } from 'src/modules/user/domain/application/use-cases/user/fetch-users.use-case';
import { UserPresenter } from '../../presenters/user.presenter';

@Controller('users')
export class FetchUsersController {
  constructor(private readonly fetchUsersUseCase: FetchUsersUseCase) { }

  @Get()
  @HttpCode(200)
  async handle(
    @Query('page', ParseIntPipe) page: number,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Query('param') param: string,
  ) {
    const result = await this.fetchUsersUseCase.execute({
      page,
      perPage,
      param,
    });
    if (result.isFailure()) {
      throw new BadRequestException();
    }

    const users = result.value.users.map(UserPresenter.toHTTP);
    const totalRecords = result.value.totalRecords;

    return { users, totalRecords };
  }
}
