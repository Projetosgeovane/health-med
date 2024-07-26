import { ResourceExistsError } from 'libs/core/src/errors';
import { Either, success } from 'libs/core/src/types';
import { Injectable } from '@nestjs/common';
import { AvailabilityRepository } from '../../repositories/availability.repository';
import { AvailabilityEntity } from '../../../enterprise/availability.entity';

interface AvailabilityRequest {
  date: string;
  time: string;
  doctorId: string;
}

type AvailabilityResponse = Either<ResourceExistsError, object>;

@Injectable()
export class CreateAvailabilityUseCase {
  constructor(
    private readonly availabilityRepository: AvailabilityRepository,
  ) { }

  async execute({
    date,
    time,
    doctorId,
  }: AvailabilityRequest): Promise<AvailabilityResponse> {
    const availability = AvailabilityEntity.instance({
      date,
      time,
      doctorId,
    });

    await this.availabilityRepository.create(availability);

    return success({});
  }
}
