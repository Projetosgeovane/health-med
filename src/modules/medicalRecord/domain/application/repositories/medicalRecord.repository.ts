import { BaseRepository } from 'libs/core/src/repositories';
import { MedicalRecordEntity } from '../../enterprise/medicalRecord.entity';

export interface MedicalRecordPaginationProps {
  page: number;
  perPage: number;
  param: string;
}

export abstract class MedicalRecordRepository extends BaseRepository<MedicalRecordEntity> {
  abstract findMany(params: MedicalRecordPaginationProps);
}
