import { ResourceNotFoundError } from '@enablers/core/errors';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AvailabilityPresenter } from '../../presenters/availability.presenter';
import { FetchAvailabilityByIdUseCase } from 'src/modules/availability/domain/application/use-cases/availability/fetch-availabilitys-by-id.use-case';
import { Roles } from 'src/modules/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth-guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class FetchAvailabilityByIdController {
  constructor(
    private readonly fetchAvailabilityByIdUseCase: FetchAvailabilityByIdUseCase,
  ) { }

  @Get('availability/:id')
  @HttpCode(200)
  @Roles(UserRole.DOCTOR)
  async handle(@Param('id') id: string) {
    const result = await this.fetchAvailabilityByIdUseCase.execute({
      availabilityID: id,
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

    const availability = AvailabilityPresenter.toHTTP(
      result.value.availability,
    );

    return { availability };
  }
}
