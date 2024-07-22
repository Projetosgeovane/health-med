import { ResourceNotFoundError } from '@enablers/core/errors';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { AvailabilityPresenter } from '../../presenters/availability.presenter';
import { FetchAvailabilityByIdUseCase } from 'src/modules/availability/domain/application/use-cases/availability/fetch-availabilitys-by-id.use-case';

@Controller('availability/:id')
export class FetchAvailabilityByIdController {
  constructor(
    private readonly fetchAvailabilityByIdUseCase: FetchAvailabilityByIdUseCase,
  ) { }

  @Get()
  @HttpCode(200)
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
