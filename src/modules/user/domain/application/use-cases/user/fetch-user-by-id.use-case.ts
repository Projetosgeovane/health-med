import { ResourceNotFoundError } from '@enablers/core/errors';
import { Either, failure, success } from '@enablers/core/types';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';

interface FetchUserByIdUseCaseRequest {
  userID: string;
}

type FetchUserByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: any;
  }
>;

@Injectable()
export class FetchUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute({
    userID,
  }: FetchUserByIdUseCaseRequest): Promise<FetchUserByIdUseCaseResponse> {
    const user = await this.userRepository.findById(userID);

    if (!user) {
      return failure(new ResourceNotFoundError('Resource not found'));
    }

    return success({ user });
  }
}
