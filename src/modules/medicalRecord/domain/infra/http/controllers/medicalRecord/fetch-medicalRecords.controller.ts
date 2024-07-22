import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FetchMedicalRecordsUseCase } from 'src/modules/medicalRecord/domain/application/use-cases/medicalRecord/fetch-medicalRecords.use-case';
import { MedicalRecordPresenter } from '../../presenters/medicalRecord.presenter';

@Controller('medicalRecords')
export class FetchMedicalRecordsController {
  constructor(
    private readonly fetchMedicalRecordsUseCase: FetchMedicalRecordsUseCase,
  ) { }

  @Get()
  @HttpCode(200)
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
