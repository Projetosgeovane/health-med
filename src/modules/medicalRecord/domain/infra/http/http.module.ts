import { Module } from '@nestjs/common';
import { MedicalRecordPersistenceModule } from '../persistence/persistence.module';
import { CreateMedicalRecordUseCase } from '../../application/use-cases/medicalRecord/create-medicalRecord.use-case';
import { CreateMedicalRecordController } from './controllers/medicalRecord/create-medicalRecord.controller';

@Module({
  imports: [MedicalRecordPersistenceModule],
  controllers: [CreateMedicalRecordController],
  providers: [CreateMedicalRecordUseCase],
})
export class MedicalRecordHttpModule { }
