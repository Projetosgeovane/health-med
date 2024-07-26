import {
  ResourceExistsError,
  ResourceNotFoundError,
} from '@enablers/core/errors';
import { Either, failure } from '@enablers/core/types';
import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../repositories/appointment.repository';

// interface EditAppointmentUseCaseRequest {
//   id: string;
//   status: string;
// }

type AppointmentResponse = Either<ResourceExistsError, object>;

@Injectable()
export class EditAppointmentUseCase {
  constructor(private readonly userRepository: AppointmentRepository) { }

  async execute({ id }): Promise<AppointmentResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return failure(new ResourceNotFoundError('Appointment not found'));
    }
  }
}
