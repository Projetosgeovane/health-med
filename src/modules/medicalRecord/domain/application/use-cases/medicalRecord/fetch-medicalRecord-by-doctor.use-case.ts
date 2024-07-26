import { ResourceNotFoundError } from '@enablers/core/errors';
import { Either, failure, success } from '@enablers/core/types';
import { Injectable } from '@nestjs/common';
import { MedicalRecordRepository } from '../../repositories/medicalRecord.repository';

interface FetchMedicalRecordByPatientUseCaseRequest {
  page: number;
  perPage: number;
  patientID: string;
}

type FetchMedicalRecordByPatientUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    medicalRecords: any[];
    totalRecords: number;
  }
>;

@Injectable()
export class FetchMedicalRecordByPatientUseCase {
  constructor(
    private readonly medicalRecordRepository: MedicalRecordRepository,
  ) { }

  async execute({
    page,
    perPage,
    patientID,
  }: FetchMedicalRecordByPatientUseCaseRequest): Promise<FetchMedicalRecordByPatientUseCaseResponse> {
    const { medicalRecords, totalRecords } =
      await this.medicalRecordRepository.findByPatient({
        page,
        perPage,
        patientID,
      });

    if (!medicalRecords) {
      return failure(new ResourceNotFoundError('Resource not found'));
    }

    return success({ medicalRecords, totalRecords });
  }
}
