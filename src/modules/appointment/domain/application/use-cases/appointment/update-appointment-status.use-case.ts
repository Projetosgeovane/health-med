import { ResourceNotFoundError } from '@enablers/core/errors';
import { Either, failure, success } from '@enablers/core/types';
import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../repositories/appointment.repository';

interface UpdateAppointmentStatusUseCaseRequest {
  appointmentID: string;
  status: string;
}

type UpdateAppointmentStatusResponse = Either<ResourceNotFoundError, object>;

@Injectable()
export class UpdateAppointmentStatusUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) { }

  async execute({
    appointmentID,
    status,
  }: UpdateAppointmentStatusUseCaseRequest): Promise<UpdateAppointmentStatusResponse> {
    const appointment =
      await this.appointmentRepository.findById(appointmentID);

    if (!appointment) {
      return failure(new ResourceNotFoundError('Appointment not found'));
    }

    appointment.status = status;

    await this.appointmentRepository.save(appointment);

    return success({});
  }
}
