import { Module } from '@nestjs/common';
import { UserPersistenceModule } from '../persistence/persistence.module';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { CreateUserController } from './controllers/user/create-user.controller';
import { FetchUsersController } from './controllers/user/fetch-users.controller';
import { FetchUsersUseCase } from '../../application/use-cases/user/fetch-users.use-case';
import { FetchUserByIdUseCase } from '../../application/use-cases/user/fetch-user-by-id.use-case';
import { FetchUserByIdController } from './controllers/user/fetch-user-by-id.controller';

@Module({
  imports: [UserPersistenceModule],
  controllers: [
    CreateUserController,
    FetchUsersController,
    FetchUserByIdController,
  ],
  providers: [CreateUserUseCase, FetchUsersUseCase, FetchUserByIdUseCase],
})
export class UserHttpModule { }
