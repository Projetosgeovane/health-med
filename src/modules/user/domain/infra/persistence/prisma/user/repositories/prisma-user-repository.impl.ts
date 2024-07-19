import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { UserRepository } from 'src/modules/user/domain/application/repositories/user.repository';
import { UserEntity } from 'src/modules/user/domain/enterprise/users.entity';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';

@Injectable()
export class PrismaUserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: PrismaService) { }
  async create(data: UserEntity): Promise<void> {
    const user = PrismaUserMapper.toPrisma(data);

    await this.prisma.user.create({
      data: { ...user },
    });
  }
  save(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findManyRecent(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  findById(): Promise<UserEntity | null> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
