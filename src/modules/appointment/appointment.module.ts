import { Module } from '@nestjs/common';
import { AppointmentHttpModule } from './domain/infra/http/http.module';
import { AppointmentPersistenceModule } from './domain/infra/persistence/persistence.module';
@Module({
  imports: [AppointmentHttpModule, AppointmentPersistenceModule],
})
export class AppointmentModule { }
