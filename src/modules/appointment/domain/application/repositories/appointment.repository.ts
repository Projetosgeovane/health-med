import { BaseRepository } from 'libs/core/src/repositories';
import { AppointmentEntity } from '../../enterprise/appointment.entity';

export abstract class AppointmentRepository extends BaseRepository<AppointmentEntity> { }
