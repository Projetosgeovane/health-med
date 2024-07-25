import { Module } from '@nestjs/common';
import { CreateAvailabilityUseCase } from '../../application/use-cases/availability/create-availability.use-case';
import { CreateAvailabilityController } from './controllers/availability/create-availability.controller';
import { AvailabilityPersistenceModule } from '../persistence/persistence.module';
import { FetchAvailabilitysController } from './controllers/availability/fetch-availabilitys.controller';
import { FetchAvailabilitysUseCase } from '../../application/use-cases/availability/fetch-availabilitys.use-case';
import { FetchAvailabilityByIdController } from './controllers/availability/fetch-availability-by-id.controller';
import { FetchAvailabilityByIdUseCase } from '../../application/use-cases/availability/fetch-availabilitys-by-id.use-case';
import { EditAvailabilityUseCase } from '../../application/use-cases/availability/edit-availability.use-case';

@Module({
  imports: [AvailabilityPersistenceModule],
  controllers: [
    CreateAvailabilityController,
    FetchAvailabilitysController,
    FetchAvailabilityByIdController,
    EditAvailabilityUseCase,
  ],
  providers: [
    CreateAvailabilityUseCase,
    FetchAvailabilitysUseCase,
    FetchAvailabilityByIdUseCase,
    EditAvailabilityUseCase,
  ],
})
export class AvailabilityHttpModule { }
