import { Module } from '@nestjs/common';
import { MedicalRecordPersistenceModule } from '../persistence/persistence.module';
import { CreateMedicalRecordUseCase } from '../../application/use-cases/medicalRecord/create-medicalRecord.use-case';
import { CreateMedicalRecordController } from './controllers/medicalRecord/create-medicalRecord.controller';
import { FetchMedicalRecordsController } from './controllers/medicalRecord/fetch-medicalRecords.controller';
import { FetchMedicalRecordByIdController } from './controllers/medicalRecord/fetch-medicalRecord-by-id.controller';
import { FetchMedicalRecordByIdUseCase } from '../../application/use-cases/medicalRecord/fetch-medicalRecord-by-id.use-case';
import { FetchMedicalRecordsUseCase } from '../../application/use-cases/medicalRecord/fetch-medicalRecords.use-case';
import { FetchMedicalRecordByPatientController } from './controllers/medicalRecord/fetch-medicalRecords-by-patient.controller';
import { FetchMedicalRecordByPatientUseCase } from '../../application/use-cases/medicalRecord/fetch-medicalRecord-by-doctor.use-case';

@Module({
  imports: [MedicalRecordPersistenceModule],
  controllers: [
    CreateMedicalRecordController,
    FetchMedicalRecordByIdController,
    FetchMedicalRecordsController,
    FetchMedicalRecordByPatientController,
  ],
  providers: [
    CreateMedicalRecordUseCase,
    FetchMedicalRecordByIdUseCase,
    FetchMedicalRecordsUseCase,
    FetchMedicalRecordByPatientUseCase,
  ],
})
export class MedicalRecordHttpModule { }
