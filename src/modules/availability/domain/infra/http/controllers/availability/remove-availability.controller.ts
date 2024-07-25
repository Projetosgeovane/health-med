import { UnableRemoveError } from '@enablers/core/errors';
import {
  BadRequestException,
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  Param,
  Req,
} from '@nestjs/common';
import { RemoveAvailabilityUseCase } from 'src/modules/availability/domain/application/use-cases/availability/remove-availability.use-case';

interface User {
  id: string;
}

interface CustomRequest extends Request {
  user: User;
}

@Controller()
export class RemoveAvailabilityController {
  constructor(
    private readonly removeAvailabilityUseCase: RemoveAvailabilityUseCase,
  ) { }

  @Delete('availabilities/:id')
  @HttpCode(204)
  async handle(@Param('id') id: string, @Req() req: CustomRequest) {
    const doctorId = req.user.id;
    const result = await this.removeAvailabilityUseCase.execute({
      id,
      doctorId,
    });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case UnableRemoveError: {
          throw new ForbiddenException(error.message);
        }
        default:
          throw new BadRequestException();
      }
    }
  }
}
