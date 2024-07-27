import { Injectable } from '@nestjs/common';
import { ResourceExistsError } from 'libs/core/src/errors';
import { Either, success } from 'libs/core/src/types';
import { AppointmentRepository } from '../../repositories/appointment.repository';
import { AppointmentEntity } from '../../../enterprise/appointment.entity';

interface AppointmentRequest {
  date: string;
  time: string;
  status: string;
  doctorId: string;
  patientId: string;
}

type AppointmentResponse = Either<ResourceExistsError, object>;

@Injectable()
export class CreateAppointmentUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) { }

  async execute({
    date,
    time,
    status,
    doctorId,
    patientId,
  }: AppointmentRequest): Promise<AppointmentResponse> {
    console.log('CreateAppointmentUseCase');
    const appointment = AppointmentEntity.instance({
      date,
      time,
      status,
      doctorId,
      patientId,
    });

    await this.appointmentRepository.create(appointment);

    return success({});
  }
}
