import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateMedicalRecordUseCase } from '../../../../application/use-cases/medicalRecord/create-medicalRecord.use-case';
import { CreateMedicalRecordDTO } from '../../dtos/medicalRecord/create-medicalRecord.dto';
import { ResourceExistsError } from 'libs/core/src/errors';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/modules/auth/roles.decorator';
import { UserRole } from '@prisma/client';
@UseGuards(RolesGuard)
@Controller()
export class CreateMedicalRecordController {
  constructor(
    private readonly createMedicalRecordUseCase: CreateMedicalRecordUseCase,
  ) { }

  @Post('appointment')
  @Roles(UserRole.PATIENT)
  async handle(@Body() body: CreateMedicalRecordDTO) {
    const { document, patientId } = body;

    const result = await this.createMedicalRecordUseCase.execute({
      document,
      patientId,
    });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceExistsError: {
          throw new ConflictException(error.message);
        }
        default: {
          throw new BadRequestException();
        }
      }
    }
  }
}
