import { Module } from '@nestjs/common';
import { UserPersistenceModule } from '../persistence/persistence.module';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { CreateUserController } from './controllers/user/create-user.controller';

@Module({
  imports: [UserPersistenceModule],
  controllers: [CreateUserController],
  providers: [CreateUserUseCase],
})
export class UserHttpModule { }
