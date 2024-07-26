import { Module } from '@nestjs/common';
import { AppointmentPersistenceModule } from '../persistence/persistence.module';
import { CreateAppointmentUseCase } from '../../application/use-cases/appointment/create-appointment.use-case';
import { CreateAppointmentController } from './controllers/create-appointment.controller';
import { FetchAppointmentByIdController } from './controllers/fetch-appointment-by-id.controller';
import { FetchAppointmentsController } from './controllers/fetch-appointments.controller';
import { FetchAppointmentByIdUseCase } from '../../application/use-cases/appointment/fetch-appointment-by-id.use-case';
import { FetchAppointmentsUseCase } from '../../application/use-cases/appointment/fetch-appointments.use-case';
import { FetchAppointmentByDoctorController } from './controllers/fetch-appointments-by-doctor.controller';
import { FetchAppointmentByDoctorUseCase } from '../../application/use-cases/appointment/fetch-appointment-by-doctor.use-case';
import { UpdateAppointmentCancelController } from './controllers/update-appointment-cancel.controller';
import { UpdateAppointmentStatusController } from './controllers/update-appointment-status.controller';
import { UpdateAppointmentCancelUseCase } from '../../application/use-cases/appointment/update-appointment-cancel.use-case';
import { UpdateAppointmentStatusUseCase } from '../../application/use-cases/appointment/update-appointment-status.use-case';
import { FetchAppointmentByPatientController } from './controllers/fetch-appointments-by-patient.controller';
import { FetchAppointmentByPatientUseCase } from '../../application/use-cases/appointment/fetch-appointment-by-patient.use-case';

@Module({
  imports: [AppointmentPersistenceModule],
  controllers: [
    CreateAppointmentController,
    FetchAppointmentByIdController,
    FetchAppointmentsController,
    FetchAppointmentByDoctorController,
    FetchAppointmentByPatientController,
    UpdateAppointmentCancelController,
    UpdateAppointmentStatusController,
  ],
  providers: [
    CreateAppointmentUseCase,
    FetchAppointmentByIdUseCase,
    FetchAppointmentsUseCase,
    FetchAppointmentByDoctorUseCase,
    FetchAppointmentByPatientUseCase,
    UpdateAppointmentCancelUseCase,
    UpdateAppointmentStatusUseCase,
  ],
})
export class AppointmentHttpModule { }
