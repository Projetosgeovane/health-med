import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { PrismaMedicalRecordMapper } from '../mappers/prisma-medicalRecord.mapper';
import { MedicalRecordRepository } from 'src/modules/appointment/domain/application/repositories/appointment.repository';
import { MedicalRecordEntity } from 'src/modules/appointment/domain/enterprise/appointment.entity';

@Injectable()
export class PrismaMedicalRecordRepositoryImpl
  implements MedicalRecordRepository {
  constructor(private readonly prisma: PrismaService) { }
  async create(data: MedicalRecordEntity): Promise<void> {
    const appointment = PrismaMedicalRecordMapper.toPrisma(data);

    await this.prisma.appointment.create({
      data: { ...appointment },
    });
  }
  save(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findManyRecent(): Promise<MedicalRecordEntity[]> {
    throw new Error('Method not implemented.');
  }
  findById(): Promise<MedicalRecordEntity | null> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
