import {
  ResourceExistsError,
  ResourceNotFoundError,
} from '@enablers/core/errors';
import { Either, failure } from '@enablers/core/types';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';

// interface EditUserUseCaseRequest {
//   id: string;
//   status: string;
// }

type UserResponse = Either<ResourceExistsError, object>;

@Injectable()
export class EditUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute({ id }): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return failure(new ResourceNotFoundError('User not found'));
    }
  }
}
