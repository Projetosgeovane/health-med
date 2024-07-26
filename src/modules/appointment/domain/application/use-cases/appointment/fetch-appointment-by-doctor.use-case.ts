import { ResourceNotFoundError } from '@enablers/core/errors';
import { Either, failure, success } from '@enablers/core/types';
import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../repositories/appointment.repository';

interface FetchAppointmentByDoctorUseCaseRequest {
  page: number;
  perPage: number;
  doctorID: string;
}

type FetchAppointmentByDoctorUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    appointments: any[];
    totalRecords: number;
  }
>;

@Injectable()
export class FetchAppointmentByDoctorUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) { }

  async execute({
    page,
    perPage,
    doctorID,
  }: FetchAppointmentByDoctorUseCaseRequest): Promise<FetchAppointmentByDoctorUseCaseResponse> {
    const { appointments, totalRecords } =
      await this.appointmentRepository.findByDoctor({
        page,
        perPage,
        doctorID,
      });

    if (!appointments) {
      return failure(new ResourceNotFoundError('Resource not found'));
    }

    return success({ appointments, totalRecords });
  }
}
