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
  UseGuards,
} from '@nestjs/common';
import { AppointmentPresenter } from '../presenters/appointment.presenter';
import { FetchAppointmentByPatientUseCase } from '../../../application/use-cases/appointment/fetch-appointment-by-patient.use-case';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/modules/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth-guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class FetchAppointmentByPatientController {
  constructor(
    private readonly fetchAppointmentByPatientUseCase: FetchAppointmentByPatientUseCase,
  ) { }

  @Get('appointment/patient/:id')
  @HttpCode(200)
  @Roles(UserRole.PATIENT)
  async handle(
    @Query('page', ParseIntPipe) page: number,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Param('id') id: string,
  ) {
    const result = await this.fetchAppointmentByPatientUseCase.execute({
      page,
      perPage,
      patientID: id,
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
