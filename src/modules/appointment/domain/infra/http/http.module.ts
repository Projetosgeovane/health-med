import { Module } from '@nestjs/common';
import { UserPersistenceModule } from '../persistence/persistence.module';
import { CreateUserUseCase } from '../../application/use-cases/appointment/create-user.use-case';
import { CreateUserController } from './controllers/appointment/create-user.controller';

@Module({
  imports: [UserPersistenceModule],
  controllers: [CreateUserController],
  providers: [CreateUserUseCase],
})
export class UserHttpModule { }
