import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateAvailabilityUseCase } from '../../../../application/use-cases/availability/create-availability.use-case';
import { ResourceExistsError } from 'libs/core/src/errors';
import { CreateAvailabilityDTO } from '../../dtos/availability/create-availability.dto';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/modules/auth/roles.decorator';
import { UserRole } from '@prisma/client';

@UseGuards(RolesGuard)
@Controller()
export class CreateAvailabilityController {
  constructor(
    private readonly createAvailabilityUseCase: CreateAvailabilityUseCase,
  ) { }

  @Post('availability')
  @Roles(UserRole.DOCTOR)
  async handle(@Body() body: CreateAvailabilityDTO) {
    const { date, time, userId } = body;

    const result = await this.createAvailabilityUseCase.execute({
      date,
      time,
      userId,
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
