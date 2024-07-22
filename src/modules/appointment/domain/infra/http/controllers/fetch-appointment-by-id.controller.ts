import { ResourceNotFoundError } from '@enablers/core/errors';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { FetchAppointmentByIdUseCase } from 'src/modules/appointment/domain/application/use-cases/appointment/fetch-appointment-by-id.use-case';
import { AppointmentPresenter } from '../presenters/appointment.presenter';

@Controller('appointment/:id')
export class FetchAppointmentByIdController {
  constructor(
    private readonly fetchAppointmentByIdUseCase: FetchAppointmentByIdUseCase,
  ) { }

  @Get()
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    const result = await this.fetchAppointmentByIdUseCase.execute({
      appointmentID: id,
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

    const appointment = AppointmentPresenter.toHTTP(result.value.appointment);

    return { appointment };
  }
}
