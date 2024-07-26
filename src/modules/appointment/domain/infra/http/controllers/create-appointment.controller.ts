import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateAppointmentUseCase } from '../../../application/use-cases/appointment/create-appointment.use-case';
import { CreateAppointmentDTO } from '../dtos/appointment/create-appointment.dto';
import { ResourceExistsError } from 'libs/core/src/errors';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth-guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class CreateAppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
  ) { }

  @Post('appointment')
  @Roles('PATIENT')
  async handle(@Body() body: CreateAppointmentDTO, @Req() req: any) {
    const { date, time, status, doctorId } = body;
    const patientId = req?.user?.sub;

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
