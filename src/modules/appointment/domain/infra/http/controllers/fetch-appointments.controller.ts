import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FetchAppointmentsUseCase } from 'src/modules/appointment/domain/application/use-cases/appointment/fetch-appointments.use-case';
import { AppointmentPresenter } from '../presenters/appointment.presenter';
import { RolesGuard } from 'src/modules/auth/roles.guard';

@UseGuards(RolesGuard)
@Controller()
export class FetchAppointmentsController {
  constructor(
    private readonly fetchAppointmentsUseCase: FetchAppointmentsUseCase,
  ) { }

  @Get('appointments')
  @HttpCode(200)
  async handle(
    @Query('page', ParseIntPipe) page: number,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Query('param') param: string,
  ) {
    const result = await this.fetchAppointmentsUseCase.execute({
      page,
      perPage,
      param,
    });
    if (result.isFailure()) {
      throw new BadRequestException();
    }

    const appointments = result.value.appointments.map(
      AppointmentPresenter.toHTTP,
    );
    const totalRecords = result.value.totalRecords;

    return { appointments, totalRecords };
  }
}
