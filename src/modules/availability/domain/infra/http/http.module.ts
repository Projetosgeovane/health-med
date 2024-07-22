import { Module } from '@nestjs/common';
import { CreateAvailabilityUseCase } from '../../application/use-cases/availability/create-availability.use-case';
import { CreateAvailabilityController } from './controllers/availability/create-availability.controller';
import { AvailabilityPersistenceModule } from '../persistence/persistence.module';

@Module({
  imports: [AvailabilityPersistenceModule],
  controllers: [CreateAvailabilityController],
  providers: [CreateAvailabilityUseCase],
})
export class AvailabilityHttpModule { }
