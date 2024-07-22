import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import { CreateAppointmentUseCase } from '../../../../application/use-cases/appointment/create-appointment.use-case';
import { CreateAppointmentDTO } from '../../dtos/appointment/create-appointment.dto';
import { ResourceExistsError } from 'libs/core/src/errors';

@Controller()
export class CreateAppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
  ) { }

  @Post('appointment')
  async handle(@Body() body: CreateAppointmentDTO) {
    const { date, time, status, doctorId, patientId } = body;

    const result = await this.createAppointmentUseCase.execute({
      date,
      time,
      status,
      doctorId,
      patientId,
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
