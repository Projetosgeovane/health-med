import { Entity, UniqueEntityID } from 'libs/core/src/entities';
import { Optional } from 'libs/core/src/types';

export interface UserEntityProps {
  id: string;
  name: string;
  email: string;
  password: string;
  crm?: string;
  cpf?: string;

  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export class UserEntity extends Entity<UserEntityProps> {
  static instance(
    props: Optional<UserEntityProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const user = new UserEntity(
      {
        name: props.name ?? null,
        email: props.email ?? null,
        password: props.password ?? null,
        crm: props.password ?? null,
        cpf: props.password ?? null,
        createdAt: new Date(),
        updatedAt: props.updatedAt ?? null,
        deletedAt: props.deletedAt ?? null,
        ...props,
      },
      id,
    );

    return user;
  }
}
