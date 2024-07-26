import { ResourceNotFoundError } from '@enablers/core/errors';
import { Either, failure, success } from '@enablers/core/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppointmentRepository } from '../../repositories/appointment.repository';

interface UpdateAppointmentCancelUseCaseRequest {
  appointmentID: string;
  cancelReason: string;
  patientId: string;
}

type UpdateAppointmentCancelResponse = Either<ResourceNotFoundError, object>;

@Injectable()
export class UpdateAppointmentCancelUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) { }

  async execute({
    appointmentID,
    cancelReason,
    patientId,
  }: UpdateAppointmentCancelUseCaseRequest): Promise<UpdateAppointmentCancelResponse> {
    const appointment =
      await this.appointmentRepository.findById(appointmentID);

    if (!appointment) {
      return failure(new ResourceNotFoundError('Appointment not found'));
    }

    if (appointment.patientId !== patientId) {
      return failure(
        new UnauthorizedException(
          `You are not authorized to cancel this appointment`,
        ),
      );
    }

    appointment.cancelReason = cancelReason;
    appointment.status = 'CANCELLED';

    await this.appointmentRepository.save(appointment);

    return success({});
  }
}
