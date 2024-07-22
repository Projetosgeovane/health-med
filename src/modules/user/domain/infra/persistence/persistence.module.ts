import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserRepository } from '../../application/repositories/user.repository';
import { PrismaUserRepositoryImpl } from './prisma/user/repositories/prisma-user-repository.impl';
import { PrismaAvailabilityRepositoryImpl } from './prisma/availability/repositories/prisma-availability-repository.impl';
import { AvailabilityRepository } from '../../application/repositories/availability.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    // --
    PrismaUserRepositoryImpl,
    PrismaAvailabilityRepositoryImpl,
    // --

    {
      useClass: PrismaUserRepositoryImpl,
      provide: UserRepository,
    },
    {
      useClass: PrismaAvailabilityRepositoryImpl,
      provide: AvailabilityRepository,
    },
  ],
  exports: [
    PrismaUserRepositoryImpl,
    UserRepository,
    PrismaAvailabilityRepositoryImpl,
    AvailabilityRepository,
  ],
})
export class PersistenceModule { }
