import { BaseRepository } from 'libs/core/src/repositories';
import { MedicalRecordEntity } from '../../enterprise/medicalRecord.entity';

export abstract class MedicalRecordRepository extends BaseRepository<MedicalRecordEntity> { }
