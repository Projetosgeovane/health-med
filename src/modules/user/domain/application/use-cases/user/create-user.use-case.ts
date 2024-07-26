import { Injectable } from '@nestjs/common';
import { ResourceExistsError } from 'libs/core/src/errors';
import { Either, success } from 'libs/core/src/types';
import { UserRepository } from '../../repositories/user.repository';
import { UserEntity } from '../../../enterprise/users.entity';
import { UserRole } from '@prisma/client';

interface UserRequest {
  name: string;
  email: string;
  password: string;
  crm?: string;
  cpf?: string;
  role: UserRole;
}

type UserResponse = Either<ResourceExistsError, object>;

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute({
    name,
    email,
    password,
    crm,
    cpf,
    role,
  }: UserRequest): Promise<UserResponse> {
    const user = UserEntity.instance({
      name,
      email,
      password,
      crm,
      cpf,
      role,
    });

    await this.userRepository.create(user);

    return success({});
  }
}
