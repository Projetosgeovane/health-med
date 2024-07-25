import { ResourceNotFoundError } from '@enablers/core/errors';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { UpdateAppointmentStatusUseCase } from '../../../application/use-cases/appointment/update-appointment-status.use-case';

@Controller()
export class UpdateAppointmentStatusController {
  constructor(
    private readonly updateAppointmentStatusUseCase: UpdateAppointmentStatusUseCase,
  ) { }

  @Patch('appointments/:id/status')
  @HttpCode(204)
  async handle(
    @Param('id') appointmentID: string,
    @Body() body: { status: string },
  ) {
    const { status } = body;
    const result = await this.updateAppointmentStatusUseCase.execute({
      appointmentID,
      status,
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
  }
}
