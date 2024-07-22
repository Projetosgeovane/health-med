import { Prisma, MedicalRecord as PrismaMedicalRecord } from '@prisma/client';
import { UniqueEntityID } from 'libs/core/src/entities';
import { MedicalRecordEntity } from 'src/modules/medicalRecord/domain/enterprise/medicalRecord.entity';

export class PrismaMedicalRecordMapper {
  static toDomain(raw: PrismaMedicalRecord): MedicalRecordEntity {
    const appointment = MedicalRecordEntity.instance(
      {
        document: raw.document,
        patientId: raw.patientId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return appointment;
  }

  static toPrisma(
    appointment: MedicalRecordEntity,
  ): Prisma.MedicalRecordUncheckedCreateInput {
    return {
      id: appointment.id.toValue(),
      document: appointment.document,
      patientId: appointment.patientId,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
      deletedAt: appointment.deletedAt,
    };
  }
}
