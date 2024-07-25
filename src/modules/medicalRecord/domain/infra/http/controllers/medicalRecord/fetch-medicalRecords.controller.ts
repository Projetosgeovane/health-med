import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FetchMedicalRecordsUseCase } from 'src/modules/medicalRecord/domain/application/use-cases/medicalRecord/fetch-medicalRecords.use-case';
import { MedicalRecordPresenter } from '../../presenters/medicalRecord.presenter';
import { Roles } from 'src/modules/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/modules/auth/roles.guard';
@UseGuards(RolesGuard)
@Controller()
export class FetchMedicalRecordsController {
  constructor(
    private readonly fetchMedicalRecordsUseCase: FetchMedicalRecordsUseCase,
  ) { }

  @Get('medicalRecords')
  @HttpCode(200)
  @Roles(UserRole.DOCTOR)
  @Roles(UserRole.PATIENT)
  async handle(
    @Query('page', ParseIntPipe) page: number,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Query('param') param: string,
  ) {
    const result = await this.fetchMedicalRecordsUseCase.execute({
      page,
      perPage,
      param,
    });
    if (result.isFailure()) {
      throw new BadRequestException();
    }

    const medicalRecords = result.value.medicalRecords.map(
      MedicalRecordPresenter.toHTTP,
    );
    const totalRecords = result.value.totalRecords;

    return { medicalRecords, totalRecords };
  }
}
