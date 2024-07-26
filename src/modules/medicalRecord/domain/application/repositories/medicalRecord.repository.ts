import { BaseRepository } from 'libs/core/src/repositories';
import { MedicalRecordEntity } from '../../enterprise/medicalRecord.entity';

export interface MedicalRecordPaginationProps {
  page: number;
  perPage: number;
  param: string;
}
export interface MedicalRecordPatientPatientProps {
  page: number;
  perPage: number;
  patientID: string;
}

export abstract class MedicalRecordRepository extends BaseRepository<MedicalRecordEntity> {
  abstract findMany(params: MedicalRecordPaginationProps);
  abstract findByPatient(doctpatientIDorID: MedicalRecordPatientPatientProps);
}
