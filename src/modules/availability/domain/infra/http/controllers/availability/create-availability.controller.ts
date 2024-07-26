import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateAvailabilityUseCase } from '../../../../application/use-cases/availability/create-availability.use-case';
import { ResourceExistsError } from 'libs/core/src/errors';
import { CreateAvailabilityDTO } from '../../dtos/availability/create-availability.dto';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/modules/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth-guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class CreateAvailabilityController {
  constructor(
    private readonly createAvailabilityUseCase: CreateAvailabilityUseCase,
  ) { }

  @Post('availability')
  @Roles(UserRole.DOCTOR)
  async handle(@Body() body: CreateAvailabilityDTO, @Req() req: any) {
    const { date, time } = body;
    const doctorId = req?.user?.sub;

    const result = await this.createAvailabilityUseCase.execute({
      date,
      time,
      doctorId,
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
