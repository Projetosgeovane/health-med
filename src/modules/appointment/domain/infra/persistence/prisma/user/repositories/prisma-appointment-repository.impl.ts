import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { PrismaAppointmentMapper } from '../mappers/prisma-appointment.mapper';
import {
  AppointmentPaginationProps,
  AppointmentRepository,
} from 'src/modules/appointment/domain/application/repositories/appointment.repository';
import { AppointmentEntity } from 'src/modules/appointment/domain/enterprise/appointment.entity';

@Injectable()
export class PrismaAppointmentRepositoryImpl implements AppointmentRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findByDoctor({ doctorID, page, perPage }): Promise<any> {
    const [appointments, totalRecords] = await this.prisma.$transaction([
      this.prisma.appointment.findMany({
        where: {
          doctorId: doctorID || undefined,
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: perPage,
        skip: (page - 1) * perPage,
      }),
      this.prisma.appointment.count({
        where: {
          doctorId: doctorID || undefined,
          deletedAt: null,
        },
      }),
    ]);

    return {
      appointments: appointments.map(PrismaAppointmentMapper.toDomain),
      totalRecords,
    };
  }

  async findMany({
    page,
    param,
    perPage,
  }: AppointmentPaginationProps): Promise<any> {
    const [appointments, totalRecords] = await this.prisma.$transaction([
      this.prisma.appointment.findMany({
        where: {
          OR: param ? [{ date: { contains: param } }] : undefined,
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: perPage,
        skip: (page - 1) * perPage,
      }),
      this.prisma.appointment.count({
        where: {
          OR: param ? [{ date: { contains: param } }] : undefined,
          deletedAt: null,
        },
      }),
    ]);

    return {
      appointments: appointments.map(PrismaAppointmentMapper.toDomain),
      totalRecords,
    };
  }

  async create(data: AppointmentEntity): Promise<void> {
    const appointment = PrismaAppointmentMapper.toPrisma(data);

    await this.prisma.appointment.create({
      data: { ...appointment },
    });
  }
  save(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findManyRecent(): Promise<AppointmentEntity[]> {
    throw new Error('Method not implemented.');
  }

  async findById(appointmentId: string): Promise<any | null> {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id: appointmentId,
        deletedAt: null,
      },
    });

    if (!appointment) {
      return null;
    }

    return PrismaAppointmentMapper.toDomain(appointment);
  }

  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
