import { ResourceNotFoundError } from '@enablers/core/errors';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';

import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/modules/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { MedicalRecordPresenter } from '../../presenters/medicalRecord.presenter';
import { FetchMedicalRecordByPatientUseCase } from 'src/modules/medicalRecord/domain/application/use-cases/medicalRecord/fetch-medicalRecord-by-doctor.use-case';
@UseGuards(RolesGuard)
@Controller()
export class FetchMedicalRecordByPatientController {
  constructor(
    private readonly fetchMedicalRecordByPatientUseCase: FetchMedicalRecordByPatientUseCase,
  ) { }

  @Get('medicalRecord/patient/:id')
  @HttpCode(200)
  @Roles(UserRole.DOCTOR)
  async handle(
    @Query('page', ParseIntPipe) page: number,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Param('id') id: string,
  ) {
    const result = await this.fetchMedicalRecordByPatientUseCase.execute({
      page,
      perPage,
      patientID: id,
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

    const medicalRecords = result.value.medicalRecords.map(
      MedicalRecordPresenter.toHTTP,
    );

    const totalRecords = result.value.totalRecords;

    return { medicalRecords, totalRecords };
  }
}
