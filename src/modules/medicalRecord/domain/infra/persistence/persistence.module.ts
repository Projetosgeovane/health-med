import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { MedicalRecordRepository } from '../../application/repositories/medicalRecord.repository';
import { PrismaMedicalRecordRepositoryImpl } from './prisma/medicalRecord/repositories/prisma-medicalRecord-repository.impl';
@Module({
  imports: [DatabaseModule],
  providers: [
    // --
    PrismaMedicalRecordRepositoryImpl,
    // --

    {
      useClass: PrismaMedicalRecordRepositoryImpl,
      provide: MedicalRecordRepository,
    },
  ],
  exports: [PrismaMedicalRecordRepositoryImpl, MedicalRecordRepository],
})
export class MedicalRecordPersistenceModule { }
