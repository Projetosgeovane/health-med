import { Module } from '@nestjs/common';
import { CreateAvailabilityUseCase } from '../../application/use-cases/availability/create-availability.use-case';
import { CreateAvailabilityController } from './controllers/availability/create-availability.controller';
import { AvailabilityPersistenceModule } from '../persistence/persistence.module';
import { FetchAvailabilitysController } from './controllers/availability/fetch-availabilitys.controller';
import { FetchAvailabilitysUseCase } from '../../application/use-cases/availability/fetch-availabilitys.use-case';
import { FetchAvailabilityByIdController } from './controllers/availability/fetch-availability-by-id.controller';
import { FetchAvailabilityByIdUseCase } from '../../application/use-cases/availability/fetch-availabilitys-by-id.use-case';
import { EditAvailabilityUseCase } from '../../application/use-cases/availability/edit-availability.use-case';
import { RemoveAvailabilityController } from './controllers/availability/remove-availability.controller';
import { RemoveAvailabilityUseCase } from '../../application/use-cases/availability/remove-availability.use-case';

@Module({
  imports: [AvailabilityPersistenceModule],
  controllers: [
    CreateAvailabilityController,
    FetchAvailabilitysController,
    FetchAvailabilityByIdController,
    EditAvailabilityUseCase,
    RemoveAvailabilityController,
  ],
  providers: [
    CreateAvailabilityUseCase,
    FetchAvailabilitysUseCase,
    FetchAvailabilityByIdUseCase,
    EditAvailabilityUseCase,
    RemoveAvailabilityUseCase,
  ],
})
export class AvailabilityHttpModule { }
