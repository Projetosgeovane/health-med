import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AvailabilityModule } from './modules/availability/domain/availability.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { MedicalRecordModule } from './modules/medicalRecord/medicalRecord.module';

@Module({
  imports: [
    UserModule,
    AvailabilityModule,
    AppointmentModule,
    MedicalRecordModule,
  ],
})
export class AppModule { }
