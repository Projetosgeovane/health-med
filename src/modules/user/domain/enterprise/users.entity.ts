import { UserRole } from '@prisma/client';
import { Entity, UniqueEntityID } from 'libs/core/src/entities';
import { Optional } from 'libs/core/src/types';

export interface UserEntityProps {
  name: string;
  email: string;
  password: string;
  crm?: string;
  cpf?: string;
  role: UserRole;

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
        role: props.role ?? null,
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

  get role() {
    return this.props.role;
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

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  set password(password: string) {
    this.props.password = password;
    this.touch();
  }

  set crm(crm: string) {
    this.props.crm = crm;
    this.touch();
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf;
    this.touch();
  }

  set role(role: UserRole) {
    this.props.role = role;
    this.touch();
  }

  set deletedAt(deletedAt: Date) {
    this.props.deletedAt = deletedAt;
    this.touch();
  }
}
