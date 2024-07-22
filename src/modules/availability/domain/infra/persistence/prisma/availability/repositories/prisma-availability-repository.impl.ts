import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';

import { PrismaAvailabilityMapper } from '../mappers/prisma-availability.mapper';
import { AvailabilityRepository } from 'src/modules/availability/domain/application/repositories/availability.repository';
import { AvailabilityEntity } from 'src/modules/availability/domain/enterprise/availability.entity';

@Injectable()
export class PrismaAvailabilityRepositoryImpl
  implements AvailabilityRepository {
  constructor(private readonly prisma: PrismaService) { }
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
  findById(): Promise<AvailabilityEntity | null> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
