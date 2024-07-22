import { Entity, UniqueEntityID } from 'libs/core/src/entities';
import { Optional } from 'libs/core/src/types';

export interface UserEntityProps {
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

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get crm() {
    return this.props.crm;
  }

  get cpf() {
    return this.props.cpf;
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

  setName(name: string) {
    this.props.name = name;
    this.touch();
  }

  setEmail(email: string) {
    this.props.email = email;
    this.touch();
  }

  setPassword(password: string) {
    this.props.password = password;
    this.touch();
  }

  setCrm(crm: string) {
    this.props.crm = crm;
    this.touch();
  }

  setCpf(cpf: string) {
    this.props.cpf = cpf;
    this.touch();
  }

  setDeletedAt(deletedAt: Date) {
    this.props.deletedAt = deletedAt;
    this.touch();
  }
}
