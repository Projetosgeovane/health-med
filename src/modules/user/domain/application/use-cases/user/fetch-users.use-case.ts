import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { success } from '@enablers/core/types';

interface FetchUsersUseCaseRequest {
  page: number;
  perPage: number;
  param: string;
}

@Injectable()
export class FetchUsersUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute({ page, perPage, param }: FetchUsersUseCaseRequest) {
    const { equipments, totalRecords } = await this.userRepository.findMany({
      page,
      param,
      perPage,
    });

    return success({ equipments, totalRecords });
  }
}
