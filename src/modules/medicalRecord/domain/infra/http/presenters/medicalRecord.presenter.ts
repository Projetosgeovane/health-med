import { MedicalRecordEntity } from '../../../enterprise/medicalRecord.entity';

export class MedicalRecordPresenter {
  static toHTTP(medicalRecord: MedicalRecordEntity) {
    return {
      id: medicalRecord.id.toValue(),
      document: medicalRecord.document,
      patientId: medicalRecord.patientId,
      createdAt: medicalRecord.createdAt,
      updatedAt: medicalRecord.updatedAt,
      deletedAt: medicalRecord.deletedAt,
    };
  }
}
