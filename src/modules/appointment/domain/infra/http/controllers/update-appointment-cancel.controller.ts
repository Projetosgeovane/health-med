import { ResourceNotFoundError } from '@enablers/core/errors';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { CancelAppointmentDTO } from '../dtos/appointment/cancel-appointment.dto';
import { Request } from 'express';
import { UpdateAppointmentCancelUseCase } from '../../../application/use-cases/appointment/update-appointment-cancel.use-case';

interface User {
  id: string;
  // other properties
}

interface CustomRequest extends Request {
  user: User;
}

@Controller()
export class UpdateAppointmentCancelController {
  constructor(
    private readonly updateAppointmentCancelUseCase: UpdateAppointmentCancelUseCase,
  ) { }

  @Patch('appointments:id/status')
  @HttpCode(204)
  async handle(
    @Param('id') appointmentID: string,
    @Body() body: CancelAppointmentDTO,
    @Req() req: CustomRequest,
  ) {
    const { cancelReason } = body;
    const patientId = req.user.id;

    const result = await this.updateAppointmentCancelUseCase.execute({
      appointmentID,
      cancelReason,
      patientId,
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
