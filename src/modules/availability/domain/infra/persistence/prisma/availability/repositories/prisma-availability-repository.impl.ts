import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';

import { PrismaAvailabilityMapper } from '../mappers/prisma-availability.mapper';
import {
  AvailabilityPaginationProps,
  AvailabilityRepository,
} from 'src/modules/availability/domain/application/repositories/availability.repository';
import { AvailabilityEntity } from 'src/modules/availability/domain/enterprise/availability.entity';

@Injectable()
export class PrismaAvailabilityRepositoryImpl
  implements AvailabilityRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findMany({
    page,
    param,
    perPage,
  }: AvailabilityPaginationProps): Promise<any> {
    const [availabilitys, totalRecords] = await this.prisma.$transaction([
      this.prisma.availability.findMany({
        where: {
          OR: param ? [{ userId: { contains: param } }] : undefined,
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: perPage,
        skip: (page - 1) * perPage,
      }),
      this.prisma.availability.count({
        where: {
          OR: param ? [{ userId: { contains: param } }] : undefined,
          deletedAt: null,
        },
      }),
    ]);

    return {
      availabilitys: availabilitys.map(PrismaAvailabilityMapper.toDomain),
      totalRecords,
    };
  }

  async create(data: AvailabilityEntity): Promise<void> {
    const availability = PrismaAvailabilityMapper.toPrisma(data);

    await this.prisma.availability.create({
      data: { ...availability },
    });
  }
  save(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findManyRecent(): Promise<AvailabilityEntity[]> {
    throw new Error('Method not implemented.');
  }
  async findById(availabilityId: string): Promise<any | null> {
    const availability = await this.prisma.availability.findUnique({
      where: {
        id: availabilityId,
        deletedAt: null,
      },
    });

    if (!availability) {
      return null;
    }

    return PrismaAvailabilityMapper.toDomain(availability);
  }

  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
