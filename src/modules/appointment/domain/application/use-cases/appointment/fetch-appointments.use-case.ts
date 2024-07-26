import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../repositories/appointment.repository';
import { Either, success } from '@enablers/core/types';

interface FetchAppointmentsUseCaseRequest {
  page: number;
  perPage: number;
  param: string;
}

type FetchAppointmentsUseCaseResponse = Either<
  null,
  {
    appointments: any[];
    totalRecords: number;
  }
>;

@Injectable()
export class FetchAppointmentsUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) { }

  async execute({
    page,
    perPage,
    param,
  }: FetchAppointmentsUseCaseRequest): Promise<FetchAppointmentsUseCaseResponse> {
    const { appointments, totalRecords } =
      await this.appointmentRepository.findMany({
        page,
        param,
        perPage,
      });

    return success({ appointments, totalRecords });
  }
}
