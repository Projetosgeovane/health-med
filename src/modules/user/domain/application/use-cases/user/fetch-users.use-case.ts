import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { Either, success } from '@enablers/core/types';

interface FetchUsersUseCaseRequest {
  page: number;
  perPage: number;
  param: string;
}

type FetchUsersUseCaseResponse = Either<
  null,
  {
    users: any[];
    totalRecords: number;
  }
>;

@Injectable()
export class FetchUsersUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute({
    page,
    perPage,
    param,
  }: FetchUsersUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
    const { users, totalRecords } = await this.userRepository.findMany({
      page,
      param,
      perPage,
    });

    return success({ users, totalRecords });
  }
}
