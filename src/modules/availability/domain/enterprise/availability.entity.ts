import { Entity, UniqueEntityID } from 'libs/core/src/entities';
import { Optional } from 'libs/core/src/types';

export interface AvailabilityEntityProps {
  date: string;
  time: string;
  userId: string;

  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export class AvailabilityEntity extends Entity<AvailabilityEntityProps> {
  static instance(
    props: Optional<AvailabilityEntityProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const user = new AvailabilityEntity(
      {
        date: props.date ?? null,
        time: props.time ?? null,
        userId: props.userId ?? null,
        createdAt: new Date(),
        updatedAt: props.updatedAt ?? null,
        deletedAt: props.deletedAt ?? null,
        ...props,
      },
      id,
    );

    return user;
  }

  get date() {
    return this.props.date;
  }

  get time() {
    return this.props.time;
  }

  get userId() {
    return this.props.userId;
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

  set userId(userId: string) {
    this.props.userId = userId;
    this.touch();
  }

  set deletedAt(deletedAt: Date) {
    this.props.deletedAt = deletedAt;
    this.touch();
  }
}
