import { ResourceNotFoundError } from '@enablers/core/errors';
import { Either, failure, success } from '@enablers/core/types';
import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../repositories/appointment.repository';

interface FetchAppointmentByIdUseCaseRequest {
  appointmentID: string;
}

type FetchAppointmentByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    appointment: any;
  }
>;

@Injectable()
export class FetchAppointmentByIdUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) { }

  async execute({
    appointmentID,
  }: FetchAppointmentByIdUseCaseRequest): Promise<FetchAppointmentByIdUseCaseResponse> {
    const appointment =
      await this.appointmentRepository.findById(appointmentID);

    if (!appointment) {
      return failure(new ResourceNotFoundError('Resource not found'));
    }

    return success({ appointment });
  }
}
