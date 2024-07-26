import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { AppointmentRepository } from '../../application/repositories/appointment.repository';
import { PrismaAppointmentRepositoryImpl } from './prisma/user/repositories/prisma-appointment-repository.impl';
@Module({
  imports: [DatabaseModule],
  providers: [
    // --
    PrismaAppointmentRepositoryImpl,
    // --

    {
      useClass: PrismaAppointmentRepositoryImpl,
      provide: AppointmentRepository,
    },
  ],
  exports: [PrismaAppointmentRepositoryImpl, AppointmentRepository],
})
export class AppointmentPersistenceModule { }
