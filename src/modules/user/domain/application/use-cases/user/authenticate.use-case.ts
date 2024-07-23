import { Injectable } from '@nestjs/common';
import { ResourceExistsError } from 'libs/core/src/errors';
import { Either, success } from 'libs/core/src/types';
import { UserRepository } from 'src/modules/user/domain/application/repositories/user.repository';

interface AuthRequest {
  email: string;
}

type AuthResponse = Either<ResourceExistsError, object>;

@Injectable()
export class AuthenticateUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute({ email }: AuthRequest): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(email);

    return success({ user });
  }
}
