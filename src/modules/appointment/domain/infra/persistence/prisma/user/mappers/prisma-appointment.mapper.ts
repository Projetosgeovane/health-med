import { Prisma, Appointment as PrismaAppointment } from '@prisma/client';
import { UniqueEntityID } from 'libs/core/src/entities';
import { AppointmentEntity } from 'src/modules/appointment/domain/enterprise/appointment.entity';

export class PrismaAppointmentMapper {
  static toDomain(raw: PrismaAppointment): AppointmentEntity {
    const appointment = AppointmentEntity.instance(
      {
        date: raw.date,
        time: raw.time,
        status: raw.status,
        doctorId: raw.doctorId,
        patientId: raw.patientId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return appointment;
  }

  static toPrisma(
    appointment: AppointmentEntity,
  ): Prisma.AppointmentUncheckedCreateInput {
    return {
      id: appointment.id.toValue(),
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      doctorId: appointment.doctorId,
      patientId: appointment.patientId,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
      deletedAt: appointment.deletedAt,
    };
  }
}
