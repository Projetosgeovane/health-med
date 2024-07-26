import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import {
  UserPaginationProps,
  UserRepository,
} from 'src/modules/user/domain/application/repositories/user.repository';
import { UserEntity } from 'src/modules/user/domain/enterprise/users.entity';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';

@Injectable()
export class PrismaUserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findByRole({ role, page, perPage }): Promise<any> {
    const [users, totalRecords] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: {
          role: role || undefined,
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: perPage,
        skip: (page - 1) * perPage,
      }),
      this.prisma.user.count({
        where: {
          role: role || undefined,
          deletedAt: null,
        },
      }),
    ]);

    return {
      users: users.map(PrismaUserMapper.toDomain),
      totalRecords,
    };
  }
  async findMany({ page, param, perPage }: UserPaginationProps): Promise<any> {
    const [users, totalRecords] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: {
          OR: param ? [{ name: { contains: param } }] : undefined,
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: perPage,
        skip: (page - 1) * perPage,
      }),
      this.prisma.user.count({
        where: {
          OR: param ? [{ name: { contains: param } }] : undefined,
          deletedAt: null,
        },
      }),
    ]);

    return {
      users: users.map(PrismaUserMapper.toDomain),
      totalRecords,
    };
  }
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

  async findById(userId: string): Promise<any | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        deletedAt: null,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
