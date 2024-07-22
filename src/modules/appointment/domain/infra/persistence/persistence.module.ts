import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserRepository } from '../../application/repositories/user.repository';
import { PrismaUserRepositoryImpl } from './prisma/user/repositories/prisma-user-repository.impl';
@Module({
  imports: [DatabaseModule],
  providers: [
    // --
    PrismaUserRepositoryImpl,
    // --

    {
      useClass: PrismaUserRepositoryImpl,
      provide: UserRepository,
    },
  ],
  exports: [PrismaUserRepositoryImpl, UserRepository],
})
export class UserPersistenceModule { }
