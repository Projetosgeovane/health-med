import { ResourceNotFoundError } from '@enablers/core/errors';
import { Either, failure, success } from '@enablers/core/types';
import { Injectable } from '@nestjs/common';
import { AvailabilityRepository } from '../../repositories/availability.repository';

interface FetchAvailabilityByIdUseCaseRequest {
  availabilityID: string;
}

type FetchAvailabilityByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    availability: any;
  }
>;

@Injectable()
export class FetchAvailabilityByIdUseCase {
  constructor(
    private readonly availabilityRepository: AvailabilityRepository,
  ) { }

  async execute({
    availabilityID,
  }: FetchAvailabilityByIdUseCaseRequest): Promise<FetchAvailabilityByIdUseCaseResponse> {
    const availability =
      await this.availabilityRepository.findById(availabilityID);

    if (!availability) {
      return failure(new ResourceNotFoundError('Resource not found'));
    }

    return success({ availability });
  }
}
