import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { PrismaMedicalRecordMapper } from '../mappers/prisma-medicalRecord.mapper';
import { MedicalRecordRepository } from 'src/modules/medicalRecord/domain/application/repositories/medicalRecord.repository';
import { MedicalRecordEntity } from 'src/modules/medicalRecord/domain/enterprise/medicalRecord.entity';

@Injectable()
export class PrismaMedicalRecordRepositoryImpl
  implements MedicalRecordRepository {
  constructor(private readonly prisma: PrismaService) { }
  async create(data: MedicalRecordEntity): Promise<void> {
    const medicalRecord = PrismaMedicalRecordMapper.toPrisma(data);

    await this.prisma.medicalRecord.create({
      data: { ...medicalRecord },
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
