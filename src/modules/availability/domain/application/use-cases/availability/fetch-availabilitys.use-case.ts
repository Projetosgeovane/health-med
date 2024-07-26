import { Injectable } from '@nestjs/common';
import { Either, success } from '@enablers/core/types';
import { AvailabilityRepository } from '../../repositories/availability.repository';

interface FetchAvailabilitysUseCaseRequest {
  page: number;
  perPage: number;
  param: string;
}

type FetchAvailabilitysUseCaseResponse = Either<
  null,
  {
    availabilitys: any[];
    totalRecords: number;
  }
>;

@Injectable()
export class FetchAvailabilitysUseCase {
  constructor(
    private readonly availabilityRepository: AvailabilityRepository,
  ) { }

  async execute({
    page,
    perPage,
    param,
  }: FetchAvailabilitysUseCaseRequest): Promise<FetchAvailabilitysUseCaseResponse> {
    const { availabilitys, totalRecords } =
      await this.availabilityRepository.findMany({
        page,
        param,
        perPage,
      });

    return success({ availabilitys, totalRecords });
  }
}
