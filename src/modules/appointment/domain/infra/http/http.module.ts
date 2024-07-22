import { Module } from '@nestjs/common';
import { AppointmentPersistenceModule } from '../persistence/persistence.module';
import { CreateAppointmentUseCase } from '../../application/use-cases/appointment/create-appointment.use-case';
import { CreateAppointmentController } from './controllers/appointment/create-appointment.controller';

@Module({
  imports: [AppointmentPersistenceModule],
  controllers: [CreateAppointmentController],
  providers: [CreateAppointmentUseCase],
})
export class AppointmentHttpModule { }
