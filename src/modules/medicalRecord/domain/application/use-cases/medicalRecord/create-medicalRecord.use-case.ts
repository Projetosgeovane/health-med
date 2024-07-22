import { Injectable } from '@nestjs/common';
import { ResourceExistsError } from 'libs/core/src/errors';
import { Either, success } from 'libs/core/src/types';
import { MedicalRecordRepository } from '../../repositories/medicalRecord.repository';
import { MedicalRecordEntity } from '../../../enterprise/medicalRecord.entity';

interface MedicalRecordRequest {
  date: string;
  time: string;
  status: string;
  doctorId: string;
  patientId: string;
}

type MedicalRecordResponse = Either<ResourceExistsError, object>;

@Injectable()
export class CreateMedicalRecordUseCase {
  constructor(
    private readonly appointmentRepository: MedicalRecordRepository,
  ) { }

  async execute({
    date,
    time,
    status,
    doctorId,
    patientId,
  }: MedicalRecordRequest): Promise<MedicalRecordResponse> {
    const appointment = MedicalRecordEntity.instance({
      date,
      time,
      status,
      doctorId,
      patientId,
    });

    await this.appointmentRepository.create(appointment);

    return success({});
  }
}
