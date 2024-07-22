import {
  ResourceExistsError,
  ResourceNotFoundError,
} from '@enablers/core/errors';
import { Either, failure } from '@enablers/core/types';
import { Injectable } from '@nestjs/common';
import { MedicalRecordRepository } from '../../repositories/medicalRecord.repository';

// interface EditMedicalRecordUseCaseRequest {
//   id: string;
//   status: string;
// }

type MedicalRecordResponse = Either<ResourceExistsError, object>;

@Injectable()
export class EditMedicalRecordUseCase {
  constructor(private readonly userRepository: MedicalRecordRepository) { }

  async execute({ id }): Promise<MedicalRecordResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return failure(new ResourceNotFoundError('MedicalRecord not found'));
    }
  }
}
