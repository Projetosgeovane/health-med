import { Module } from '@nestjs/common';
import { AppointmentPersistenceModule } from '../persistence/persistence.module';
import { CreateAppointmentUseCase } from '../../application/use-cases/appointment/create-appointment.use-case';
import { CreateAppointmentController } from './controllers/create-appointment.controller';
import { FetchAppointmentByIdController } from './controllers/fetch-appointment-by-id.controller';
import { FetchAppointmentsController } from './controllers/fetch-appointments.controller';
import { FetchAppointmentByIdUseCase } from '../../application/use-cases/appointment/fetch-appointment-by-id.use-case';
import { FetchAppointmentsUseCase } from '../../application/use-cases/appointment/fetch-appointments.use-case';

@Module({
  imports: [AppointmentPersistenceModule],
  controllers: [
    CreateAppointmentController,
    FetchAppointmentByIdController,
    FetchAppointmentsController,
  ],
  providers: [
    CreateAppointmentUseCase,
    FetchAppointmentByIdUseCase,
    FetchAppointmentsUseCase,
  ],
})
export class AppointmentHttpModule { }
