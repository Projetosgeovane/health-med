import { ResourceNotFoundError } from '@enablers/core/errors';
import { Either, failure, success } from '@enablers/core/types';
import { Injectable } from '@nestjs/common';
import { MedicalRecordRepository } from '../../repositories/medicalRecord.repository';

interface FetchMedicalRecordByIdUseCaseRequest {
  medicalRecordID: string;
}

type FetchMedicalRecordByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    medicalRecord: any;
  }
>;

@Injectable()
export class FetchMedicalRecordByIdUseCase {
  constructor(
    private readonly medicalRecordRepository: MedicalRecordRepository,
  ) { }

  async execute({
    medicalRecordID,
  }: FetchMedicalRecordByIdUseCaseRequest): Promise<FetchMedicalRecordByIdUseCaseResponse> {
    const medicalRecord =
      await this.medicalRecordRepository.findById(medicalRecordID);

    if (!medicalRecord) {
      return failure(new ResourceNotFoundError('Resource not found'));
    }

    return success({ medicalRecord });
  }
}
