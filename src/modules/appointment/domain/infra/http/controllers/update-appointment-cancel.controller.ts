import { ResourceNotFoundError } from '@enablers/core/errors';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CancelAppointmentDTO } from '../dtos/appointment/cancel-appointment.dto';
import { UpdateAppointmentCancelUseCase } from '../../../application/use-cases/appointment/update-appointment-cancel.use-case';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth-guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class UpdateAppointmentCancelController {
  constructor(
    private readonly updateAppointmentCancelUseCase: UpdateAppointmentCancelUseCase,
  ) { }

  @Put('appointments/:id/cancel')
  @Roles('PATIENT')
  @HttpCode(204)
  async handle(
    @Param('id') appointmentID: string,
    @Body() body: CancelAppointmentDTO,
    @Req() req: any,
  ) {
    const { cancelReason } = body;
    const patientId = req.user.sub;

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
