import { Injectable } from '@nestjs/common';
import { ResourceExistsError } from 'libs/core/src/errors';
import { Either, success } from 'libs/core/src/types';
import { MedicalRecordRepository } from '../../repositories/medicalRecord.repository';
import { MedicalRecordEntity } from '../../../enterprise/medicalRecord.entity';
import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';
import { v4 as uuidv4 } from 'uuid';
import { IUploadedFile } from '../../../infra/http/controllers/medicalRecord/create-medicalRecord.controller';

interface MedicalRecordRequest {
  file: IUploadedFile;
  patientId: string;
}

type MedicalRecordResponse = Either<ResourceExistsError, object>;

@Injectable()
export class CreateMedicalRecordUseCase {
  private readonly s3Client: S3Client;
  constructor(
    private readonly medicalRecordRepository: MedicalRecordRepository,
  ) {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: fromIni({ profile: 'lab' }),
    });
  }

  async execute({
    file,
    patientId,
  }: MedicalRecordRequest): Promise<MedicalRecordResponse> {
    const fileKey = `medical-records/${uuidv4()}-${file?.originalname}`;

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileKey,
      Body: file.buffer,
      CL: 'public-read' as ObjectCannedACL,
    };

    await this.s3Client.send(new PutObjectCommand(uploadParams));

    const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    const medicalRecord = MedicalRecordEntity.instance({
      document: fileUrl,
      patientId,
    });

    await this.medicalRecordRepository.create(medicalRecord);

    return success({});
  }
}
