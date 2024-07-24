import { ResourceNotFoundError } from '@enablers/core/errors';
import { Either, failure, success } from '@enablers/core/types';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';

interface FetchUsersByRoleUseCaseRequest {
  page: number;
  perPage: number;
  role: string;
}

type FetchUsersByRoleUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    users: any[];
    totalRecords: number;
  }
>;

@Injectable()
export class FetchUsersByRoleUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute({
    page,
    perPage,
    role,
  }: FetchUsersByRoleUseCaseRequest): Promise<FetchUsersByRoleUseCaseResponse> {
    const { users, totalRecords } = await this.userRepository.findByRole({
      page,
      perPage,
      role,
    });

    if (!users) {
      return failure(new ResourceNotFoundError('Resource not found'));
    }

    return success({ users, totalRecords });
  }
}
