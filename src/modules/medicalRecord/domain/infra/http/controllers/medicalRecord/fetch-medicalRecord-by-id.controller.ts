import { ResourceNotFoundError } from '@enablers/core/errors';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { FetchMedicalRecordByIdUseCase } from 'src/modules/medicalRecord/domain/application/use-cases/medicalRecord/fetch-medicalRecord-by-id.use-case';
import { MedicalRecordPresenter } from '../../presenters/medicalRecord.presenter';

@Controller('medicalRecord/:id')
export class FetchMedicalRecordByIdController {
  constructor(
    private readonly fetchMedicalRecordByIdUseCase: FetchMedicalRecordByIdUseCase,
  ) { }

  @Get()
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    const result = await this.fetchMedicalRecordByIdUseCase.execute({
      medicalRecordID: id,
    });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException();
      }
    }

    const medicalRecord = MedicalRecordPresenter.toHTTP(
      result.value.medicalRecord,
    );

    return { medicalRecord };
  }
}
