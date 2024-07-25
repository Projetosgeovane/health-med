import { ResourceNotFoundError } from '@enablers/core/errors';
import {
  BadRequestException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';

@Controller('device/parser-enabled')
export class UpdateAppointmentStatusController {
  constructor(
    private readonly updateAppointmentStatusUseCase: UpdateAppointmentStatusUseCase,
  ) { }

  @Patch(':id')
  @HttpCode(204)
  async handle(@Param('id') appointmentID: string) {
    const result = await this.updateAppointmentStatusUseCase.execute({
      appointmentID,
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
