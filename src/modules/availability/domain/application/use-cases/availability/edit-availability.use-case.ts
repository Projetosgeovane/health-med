import { ResourceNotFoundError } from '@enablers/core/errors';
import { Either, failure, success } from '@enablers/core/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AvailabilityRepository } from '../../repositories/availability.repository';

interface EditAvailabilityUseCaseRequest {
  availabilityID: string;
  date: string;
  time: string;
  doctorId: string;
}

type EditAvailabilityResponse = Either<ResourceNotFoundError, object>;

@Injectable()
export class EditAvailabilityUseCase {
  constructor(
    private readonly availabilityRepository: AvailabilityRepository,
  ) { }

  async execute({
    availabilityID,
    date,
    time,
    doctorId,
  }: EditAvailabilityUseCaseRequest): Promise<EditAvailabilityResponse> {
    const availability =
      await this.availabilityRepository.findById(availabilityID);

    if (!availability) {
      return failure(new ResourceNotFoundError('Availability not found'));
    }

    if (availability.doctorId !== doctorId) {
      throw new UnauthorizedException(
        `You are not authorized to update this availability`,
      );
    }

    availability.date = date;
    availability.time = time;

    await this.availabilityRepository.save(availability);

    return success({});
  }
}
