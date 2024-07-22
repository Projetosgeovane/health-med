import { Injectable } from '@nestjs/common';
import { ResourceExistsError } from 'libs/core/src/errors';
import { Either, success } from 'libs/core/src/types';
import { MedicalRecordRepository } from '../../repositories/medicalRecord.repository';
import { MedicalRecordEntity } from '../../../enterprise/medicalRecord.entity';

interface MedicalRecordRequest {
  document: string;
  patientId: string;
}

type MedicalRecordResponse = Either<ResourceExistsError, object>;

@Injectable()
export class CreateMedicalRecordUseCase {
  constructor(
    private readonly appointmentRepository: MedicalRecordRepository,
  ) { }

  async execute({
    document,
    patientId,
  }: MedicalRecordRequest): Promise<MedicalRecordResponse> {
    const medicalRecord = MedicalRecordEntity.instance({
      document,
      patientId,
    });

    await this.appointmentRepository.create(medicalRecord);

    return success({});
  }
}
