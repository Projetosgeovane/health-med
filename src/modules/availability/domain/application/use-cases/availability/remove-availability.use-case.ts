import { UnableRemoveError } from '@enablers/core/errors';
import { Either, failure, success } from '@enablers/core/types';
import { Injectable } from '@nestjs/common';
import { AvailabilityRepository } from '../../repositories/availability.repository';

interface RemoveAvailabilityUseCaseRequest {
  id: string;
  doctorId: string;
}

type RemoveAvailabilityUseCaseResponse = Either<UnableRemoveError, object>;

@Injectable()
export class RemoveAvailabilityUseCase {
  constructor(
    private readonly availabilityRepository: AvailabilityRepository,
  ) { }

  async execute({
    id,
    doctorId,
  }: RemoveAvailabilityUseCaseRequest): Promise<RemoveAvailabilityUseCaseResponse> {
    const availability = await this.availabilityRepository.findById(id);

    if (!availability) {
      return failure(
        new UnableRemoveError(`Availability id '${id}' not found`),
      );
    }

    if (availability.doctorId !== doctorId) {
      return failure(
        new UnableRemoveError(
          `Doctor id '${doctorId}' does not have permission to remove availability id '${id}'`,
        ),
      );
    }

    await this.availabilityRepository.delete(id);
    return success({});
  }
}
