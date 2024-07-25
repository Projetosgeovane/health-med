import { Entity, UniqueEntityID } from 'libs/core/src/entities';
import { Optional } from 'libs/core/src/types';

export interface MedicalRecordEntityProps {
  document: string;
  patientId: string;

  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export class MedicalRecordEntity extends Entity<MedicalRecordEntityProps> {
  static instance(
    props: Optional<MedicalRecordEntityProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const medicalRecord = new MedicalRecordEntity(
      {
        document: props.document ?? null,
        patientId: props.patientId ?? null,
        createdAt: new Date(),
        updatedAt: props.updatedAt ?? null,
        deletedAt: props.deletedAt ?? null,
        ...props,
      },
      id,
    );

    return medicalRecord;
  }

  get document() {
    return this.props.document;
  }

  get patientId() {
    return this.props.patientId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }

  set document(document: string) {
    this.props.document = document;
  }

  set patientId(patientId: string) {
    this.props.patientId = patientId;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  set deletedAt(deletedAt: Date) {
    this.props.deletedAt = deletedAt;
  }
}
