import { AppointmentEntity } from '../../../enterprise/appointment.entity';

export class AppointmentPresenter {
  static toHTTP(appointment: AppointmentEntity) {
    return {
      id: appointment.id.toValue(),
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      cancelReason: appointment.cancelReason,
      doctorId: appointment.doctorId,
      patientId: appointment.patientId,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
      deletedAt: appointment.deletedAt,
    };
  }
}
