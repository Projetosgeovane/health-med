import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AvailabilityModule } from './modules/availability/domain/availability.module';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [UserModule, AvailabilityModule, AppointmentModule],
})
export class AppModule { }
