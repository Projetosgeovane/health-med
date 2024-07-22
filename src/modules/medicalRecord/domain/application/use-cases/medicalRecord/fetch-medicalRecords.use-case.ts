import { Injectable } from '@nestjs/common';
import { MedicalRecordRepository } from '../../repositories/medicalRecord.repository';
import { Either, success } from '@enablers/core/types';

interface FetchMedicalRecordsUseCaseRequest {
  page: number;
  perPage: number;
  param: string;
}

type FetchMedicalRecordsUseCaseResponse = Either<
  null,
  {
    medicalRecords: any[];
    totalRecords: number;
  }
>;

@Injectable()
export class FetchMedicalRecordsUseCase {
  constructor(
    private readonly medicalRecordRepository: MedicalRecordRepository,
  ) { }

  async execute({
    page,
    perPage,
    param,
  }: FetchMedicalRecordsUseCaseRequest): Promise<FetchMedicalRecordsUseCaseResponse> {
    const { medicalRecords, totalRecords } =
      await this.medicalRecordRepository.findMany({
        page,
        param,
        perPage,
      });

    return success({ medicalRecords, totalRecords });
  }
}
