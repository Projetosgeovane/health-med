import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { CreateUserController } from './controllers/user/create-user.controller';
import { CreateAvailabilityUseCase } from '../../application/use-cases/availability/create-availability.use-case';
import { CreateAvailabilityController } from './controllers/availability/create-availability.controller';

@Module({
  imports: [PersistenceModule],
  controllers: [CreateUserController, CreateAvailabilityController],
  providers: [CreateUserUseCase, CreateAvailabilityUseCase],
})
export class HttpModule { }
