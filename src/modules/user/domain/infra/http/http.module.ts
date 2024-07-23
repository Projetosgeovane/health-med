import { Module } from '@nestjs/common';
import { UserPersistenceModule } from '../persistence/persistence.module';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { CreateUserController } from './controllers/user/create-user.controller';
import { FetchUsersController } from './controllers/user/fetch-users.controller';
import { FetchUsersUseCase } from '../../application/use-cases/user/fetch-users.use-case';
import { FetchUserByIdUseCase } from '../../application/use-cases/user/fetch-user-by-id.use-case';
import { FetchUserByIdController } from './controllers/user/fetch-user-by-id.controller';
import { AuthenticateController } from './controllers/user/authenticate.controller';
import { AuthenticateUseCase } from '../../application/use-cases/user/authenticate.use-case';

@Module({
  imports: [UserPersistenceModule],
  controllers: [
    CreateUserController,
    FetchUsersController,
    FetchUserByIdController,
    AuthenticateController,
  ],
  providers: [
    CreateUserUseCase,
    FetchUsersUseCase,
    FetchUserByIdUseCase,
    AuthenticateUseCase,
  ],
})
export class UserHttpModule { }
