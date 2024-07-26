import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateMedicalRecordUseCase } from '../../../../application/use-cases/medicalRecord/create-medicalRecord.use-case';
import { ResourceExistsError } from 'libs/core/src/errors';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/modules/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import 'multer';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth-guard';

export interface IUploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class CreateMedicalRecordController {
  constructor(
    private readonly createMedicalRecordUseCase: CreateMedicalRecordUseCase,
  ) { }

  @Post('medicalRecord')
  @Roles(UserRole.PATIENT)
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @Body() body: { description: string },
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    const patientId = req?.user?.sub;

    const result = await this.createMedicalRecordUseCase.execute({
      file,
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
