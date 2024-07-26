import { UserEntity } from '../../../enterprise/users.entity';

export class UserPresenter {
  static toHTTP(user: UserEntity) {
    return {
      id: user.id.toValue(),
      name: user.name,
      email: user.email,
      crm: user.crm,
      cpf: user.cpf,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }
}
