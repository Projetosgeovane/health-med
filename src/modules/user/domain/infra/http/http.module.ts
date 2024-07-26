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
import { FetchUsersByRoleController } from './controllers/user/fetch-users-by-role.controller';
import { FetchUsersByRoleUseCase } from '../../application/use-cases/user/fetch-users-by-role.use-case';

@Module({
  imports: [UserPersistenceModule],
  controllers: [
    CreateUserController,
    FetchUsersController,
    FetchUserByIdController,
    FetchUsersByRoleController,
    AuthenticateController,
  ],
  providers: [
    CreateUserUseCase,
    FetchUsersUseCase,
    FetchUserByIdUseCase,
    FetchUsersByRoleUseCase,
    AuthenticateUseCase,
  ],
})
export class UserHttpModule { }
