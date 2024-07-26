import { UseCaseError } from '@enablers/core/errors';

export class InvalidCredentialsError extends Error implements UseCaseError {
  constructor(message: string = 'Invalid credentials') {
    super(message);
  }
}
