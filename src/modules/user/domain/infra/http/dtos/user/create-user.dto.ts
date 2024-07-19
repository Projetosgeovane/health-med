import { IsOptional } from 'class-validator';

export class CreateUserDTO {
  name: string;

  email: string;

  password: string;

  @IsOptional()
  crm: string;

  @IsOptional()
  cpf?: string;
}
