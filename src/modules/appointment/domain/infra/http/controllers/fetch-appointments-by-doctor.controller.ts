import { ResourceNotFoundError } from '@enablers/core/errors';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AppointmentPresenter } from '../presenters/appointment.presenter';
import { FetchAppointmentByDoctorUseCase } from '../../../application/use-cases/appointment/fetch-appointment-by-doctor.use-case';

@Controller('appointment/doctor/:id')
export class FetchAppointmentByDoctorController {
  constructor(
    private readonly fetchAppointmentByDoctorUseCase: FetchAppointmentByDoctorUseCase,
  ) { }

  @Get()
  @HttpCode(200)
  async handle(
    @Query('page', ParseIntPipe) page: number,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Param('id') id: string,
  ) {
    const result = await this.fetchAppointmentByDoctorUseCase.execute({
      page,
      perPage,
      doctorID: id,
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

    const appointments = result.value.appointments.map(
      AppointmentPresenter.toHTTP,
    );

    const totalRecords = result.value.totalRecords;

    return { appointments, totalRecords };
  }
}
