import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { PrismaAppointmentMapper } from '../mappers/prisma-appointment.mapper';
import { AppointmentRepository } from 'src/modules/appointment/domain/application/repositories/appointment.repository';
import { AppointmentEntity } from 'src/modules/appointment/domain/enterprise/appointment.entity';

@Injectable()
export class PrismaAppointmentRepositoryImpl implements AppointmentRepository {
  constructor(private readonly prisma: PrismaService) { }
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
  findById(): Promise<AppointmentEntity | null> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
