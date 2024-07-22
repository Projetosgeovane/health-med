import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FetchAvailabilitysUseCase } from 'src/modules/availability/domain/application/use-cases/availability/fetch-availabilitys.use-case';
import { AvailabilityPresenter } from '../../presenters/availability.presenter';

@Controller('availabilitys')
export class FetchAvailabilitysController {
  constructor(
    private readonly fetchAvailabilitysUseCase: FetchAvailabilitysUseCase,
  ) { }

  @Get()
  @HttpCode(200)
  async handle(
    @Query('page', ParseIntPipe) page: number,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Query('param') param: string,
  ) {
    const result = await this.fetchAvailabilitysUseCase.execute({
      page,
      perPage,
      param,
    });
    if (result.isFailure()) {
      throw new BadRequestException();
    }

    const availabilitys = result.value.availabilitys.map(
      AvailabilityPresenter.toHTTP,
    );
    const totalRecords = result.value.totalRecords;

    return { availabilitys, totalRecords };
  }
}
