import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { PrismaMedicalRecordMapper } from '../mappers/prisma-medicalRecord.mapper';
import {
  MedicalRecordPaginationProps,
  MedicalRecordRepository,
} from 'src/modules/medicalRecord/domain/application/repositories/medicalRecord.repository';
import { MedicalRecordEntity } from 'src/modules/medicalRecord/domain/enterprise/medicalRecord.entity';

@Injectable()
export class PrismaMedicalRecordRepositoryImpl
  implements MedicalRecordRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findMany({
    page,
    param,
    perPage,
  }: MedicalRecordPaginationProps): Promise<any> {
    const [medicalRecords, totalRecords] = await this.prisma.$transaction([
      this.prisma.medicalRecord.findMany({
        where: {
          OR: param ? [{ patientId: { contains: param } }] : undefined,
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: perPage,
        skip: (page - 1) * perPage,
      }),
      this.prisma.medicalRecord.count({
        where: {
          OR: param ? [{ patientId: { contains: param } }] : undefined,
          deletedAt: null,
        },
      }),
    ]);

    return {
      medicalRecords: medicalRecords.map(PrismaMedicalRecordMapper.toDomain),
      totalRecords,
    };
  }

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
  async findById(medicalRecordId: string): Promise<any | null> {
    const medicalRecord = await this.prisma.medicalRecord.findUnique({
      where: {
        id: medicalRecordId,
        deletedAt: null,
      },
    });

    if (!medicalRecord) {
      return null;
    }

    return PrismaMedicalRecordMapper.toDomain(medicalRecord);
  }

  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
