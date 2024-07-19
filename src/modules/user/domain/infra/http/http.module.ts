import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { CreateUserController } from './controllers/user/create-user.controller';

@Module({
  imports: [PersistenceModule],
  controllers: [CreateUserController],
  providers: [CreateUserUseCase],
})
export class HttpModule { }
