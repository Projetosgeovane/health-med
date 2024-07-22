import { Module } from '@nestjs/common';
import { MedicalRecordHttpModule } from './domain/infra/http/http.module';
import { MedicalRecordPersistenceModule } from './domain/infra/persistence/persistence.module';
@Module({
  imports: [MedicalRecordHttpModule, MedicalRecordPersistenceModule],
})
export class MedicalRecordModule { }
