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
} from '@nestjs/common';
import { EditAvailabilityUseCase } from 'src/modules/availability/domain/application/use-cases/availability/edit-availability.use-case';
import { UpdateAvailabilityDTO } from '../../dtos/availability/update-availability.dto';
import { Request } from 'express';

interface User {
  id: string;
  // other properties
}

interface CustomRequest extends Request {
  user: User;
}

@Controller()
export class EditAvailabilityController {
  constructor(
    private readonly updateAvailabilityUseCase: EditAvailabilityUseCase,
  ) { }

  @Put('availabilities/:id')
  @HttpCode(204)
  async handle(
    @Param('id') availabilityID: string,
    @Body() body: UpdateAvailabilityDTO,
    @Req() req: CustomRequest,
  ) {
    const { date, time } = body;
    const doctorId = req.user.id;

    const result = await this.updateAvailabilityUseCase.execute({
      availabilityID,
      date,
      time,
      doctorId,
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
