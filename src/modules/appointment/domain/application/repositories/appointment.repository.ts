import { BaseRepository } from 'libs/core/src/repositories';
import { AppointmentEntity } from '../../enterprise/appointment.entity';

export interface AppointmentPaginationProps {
  page: number;
  perPage: number;
  param: string;
}

export interface AppointmentDoctorProps {
  page: number;
  perPage: number;
  doctorID: string;
}

export abstract class AppointmentRepository extends BaseRepository<AppointmentEntity> {
  abstract findMany(params: AppointmentPaginationProps);
  abstract findByDoctor(doctorID: AppointmentDoctorProps);
}
