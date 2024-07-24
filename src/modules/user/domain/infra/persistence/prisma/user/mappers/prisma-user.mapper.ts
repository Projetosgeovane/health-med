import { UserEntity } from 'src/modules/user/domain/enterprise/users.entity';
import { Prisma, User as PrismaUser } from '@prisma/client';
import { UniqueEntityID } from 'libs/core/src/entities';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): UserEntity {
    const user = UserEntity.instance(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        crm: raw.crm,
        cpf: raw.cpf,
        role: raw.role,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return user;
  }

  static toPrisma(user: UserEntity): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toValue(),
      name: user.name,
      email: user.email,
      password: user.password,
      crm: user.crm,
      cpf: user.cpf,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }
}
