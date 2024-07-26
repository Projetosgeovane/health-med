import { BaseRepository } from 'libs/core/src/repositories';
import { UserEntity } from '../../enterprise/users.entity';

export interface UserPaginationProps {
  page: number;
  perPage: number;
  param: string;
}

interface UserRoleProps {
  page: number;
  perPage: number;
  role: string;
}

export abstract class UserRepository extends BaseRepository<UserEntity> {
  abstract findMany(params: UserPaginationProps);
  abstract findByRole(params: UserRoleProps);
  abstract findByEmail(email: string): Promise<UserEntity | null>;
}
