import { ResourceNotFoundError } from '@enablers/core/errors';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FetchMedicalRecordByIdUseCase } from 'src/modules/medicalRecord/domain/application/use-cases/medicalRecord/fetch-medicalRecord-by-id.use-case';
import { MedicalRecordPresenter } from '../../presenters/medicalRecord.presenter';
import { Roles } from 'src/modules/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth-guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class FetchMedicalRecordByIdController {
  constructor(
    private readonly fetchMedicalRecordByIdUseCase: FetchMedicalRecordByIdUseCase,
  ) { }

  @Get('medicalRecord/:id')
  @HttpCode(200)
  @Roles(UserRole.DOCTOR)
  @Roles(UserRole.PATIENT)
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
