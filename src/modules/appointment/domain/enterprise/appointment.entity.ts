import { Entity, UniqueEntityID } from 'libs/core/src/entities';
import { Optional } from 'libs/core/src/types';

export interface AppointmentEntityProps {
  date: string;
  time: string;
  status: string;
  doctorId: string;
  patientId: string;

  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export class AppointmentEntity extends Entity<AppointmentEntityProps> {
  static instance(
    props: Optional<AppointmentEntityProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const appointment = new AppointmentEntity(
      {
        date: props.date ?? null,
        time: props.time ?? null,
        status: props.status ?? null,
        doctorId: props.doctorId ?? null,
        patientId: props.patientId ?? null,
        createdAt: new Date(),
        updatedAt: props.updatedAt ?? null,
        deletedAt: props.deletedAt ?? null,
        ...props,
      },
      id,
    );

    return appointment;
  }

  get date() {
    return this.props.date;
  }

  get time() {
    return this.props.time;
  }

  get status() {
    return this.props.status;
  }

  get doctorId() {
    return this.props.doctorId;
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

  private touch() {
    this.props.updatedAt = new Date();
  }

  set date(date: string) {
    this.props.date = date;
    this.touch();
  }

  set time(time: string) {
    this.props.time = time;
    this.touch();
  }

  set status(status: string) {
    this.props.status = status;
    this.touch();
  }

  set doctorId(doctorId: string) {
    this.props.doctorId = doctorId;
    this.touch();
  }

  set patientId(patientId: string) {
    this.props.patientId = patientId;
    this.touch();
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
    this.touch();
  }

  set deletedAt(deletedAt: Date) {
    this.props.deletedAt = deletedAt;
    this.touch();
  }
}
