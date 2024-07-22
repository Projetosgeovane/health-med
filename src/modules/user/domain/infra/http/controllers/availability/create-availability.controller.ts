import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import { CreateAvailabilityUseCase } from '../../../../application/use-cases/availability/create-availability.use-case';
import { ResourceExistsError } from 'libs/core/src/errors';
import { CreateAvailabilityDTO } from '../../dtos/availability/create-availability.dto';

@Controller()
export class CreateAvailabilityController {
  constructor(
    private readonly createAvailabilityUseCase: CreateAvailabilityUseCase,
  ) { }

  @Post('availability')
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
