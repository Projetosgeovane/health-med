import { UnableRemoveError } from '@enablers/core/errors';
import {
  BadRequestException,
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth-guard';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { RemoveAvailabilityUseCase } from 'src/modules/availability/domain/application/use-cases/availability/remove-availability.use-case';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class RemoveAvailabilityController {
  constructor(
    private readonly removeAvailabilityUseCase: RemoveAvailabilityUseCase,
  ) { }

  @Delete('availabilities/:id')
  @Roles(UserRole.DOCTOR)
  @HttpCode(204)
  async handle(@Param('id') id: string, @Req() req: any) {
    const doctorId = req.user.sub;
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
