import { Injectable } from '@nestjs/common';
import { ResourceExistsError } from 'libs/core/src/errors';
import { Either, failure, success } from 'libs/core/src/types';
import { UserRepository } from 'src/modules/user/domain/application/repositories/user.repository';
import { WrongCredentialsError } from '../errors/wrong-credentials-error';

interface AuthRequest {
  email: string;
  password: string;
}

type AuthResponse = Either<ResourceExistsError, object>;

@Injectable()
export class AuthenticateUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute({ email, password }: AuthRequest): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return failure(new WrongCredentialsError());
    }

    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return failure(new WrongCredentialsError());
    }

    return success({ user });
  }
}
