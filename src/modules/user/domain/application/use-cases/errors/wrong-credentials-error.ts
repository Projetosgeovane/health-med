import { UseCaseError } from '@enablers/core/errors';

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super(`Credentials are not valid.`);
  }
}
