import { ResourceNotFoundError } from '@enablers/core/errors';
import { Either, failure, success } from '@enablers/core/types';
import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../repositories/appointment.repository';

interface FetchAppointmentByPatientUseCaseRequest {
  page: number;
  perPage: number;
  patientID: string;
}

type FetchAppointmentByPatientUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    appointments: any[];
    totalRecords: number;
  }
>;

@Injectable()
export class FetchAppointmentByPatientUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) { }

  async execute({
    page,
    perPage,
    patientID,
  }: FetchAppointmentByPatientUseCaseRequest): Promise<FetchAppointmentByPatientUseCaseResponse> {
    const { appointments, totalRecords } =
      await this.appointmentRepository.findByPatient({
        page,
        perPage,
        patientID,
      });

    if (!appointments) {
      return failure(new ResourceNotFoundError('Resource not found'));
    }

    return success({ appointments, totalRecords });
  }
}
