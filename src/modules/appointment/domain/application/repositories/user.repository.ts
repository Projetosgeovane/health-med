import { BaseRepository } from 'libs/core/src/repositories';
import { UserEntity } from '../../enterprise/users.entity';

export abstract class UserRepository extends BaseRepository<UserEntity> { }
