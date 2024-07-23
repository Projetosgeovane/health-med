import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AvailabilityModule } from './modules/availability/domain/availability.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { MedicalRecordModule } from './modules/medicalRecord/medicalRecord.module';
import { envSchema } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    UserModule,
    AvailabilityModule,
    AppointmentModule,
    MedicalRecordModule,
  ],
})
export class AppModule { }
