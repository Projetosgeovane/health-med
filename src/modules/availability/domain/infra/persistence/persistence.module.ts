import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { PrismaAvailabilityRepositoryImpl } from './prisma/availability/repositories/prisma-availability-repository.impl';
import { AvailabilityRepository } from '../../application/repositories/availability.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    // --

    PrismaAvailabilityRepositoryImpl,
    // --

    {
      useClass: PrismaAvailabilityRepositoryImpl,
      provide: AvailabilityRepository,
    },
  ],
  exports: [PrismaAvailabilityRepositoryImpl, AvailabilityRepository],
})
export class AvailabilityPersistenceModule { }
