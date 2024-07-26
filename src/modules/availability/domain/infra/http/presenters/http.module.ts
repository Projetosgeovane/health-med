import { Module } from '@nestjs/common';
import { AvailabilityPersistenceModule } from '../../persistence/persistence.module';
import { CreateAvailabilityController } from '../controllers/availability/create-availability.controller';
import { FetchAvailabilitysController } from '../controllers/availability/fetch-availabilitys.controller';
import { FetchAvailabilityByIdController } from '../controllers/availability/fetch-availability-by-id.controller';
import { EditAvailabilityController } from '../controllers/availability/edit-availability.controller';
import { RemoveAvailabilityController } from '../controllers/availability/remove-availability.controller';
import { CreateAvailabilityUseCase } from '../../../application/use-cases/availability/create-availability.use-case';
import { FetchAvailabilitysUseCase } from '../../../application/use-cases/availability/fetch-availabilitys.use-case';
import { FetchAvailabilityByIdUseCase } from '../../../application/use-cases/availability/fetch-availabilitys-by-id.use-case';
import { EditAvailabilityUseCase } from '../../../application/use-cases/availability/edit-availability.use-case';
import { RemoveAvailabilityUseCase } from '../../../application/use-cases/availability/remove-availability.use-case';

@Module({
  imports: [AvailabilityPersistenceModule],
  controllers: [
    CreateAvailabilityController,
    FetchAvailabilitysController,
    FetchAvailabilityByIdController,
    EditAvailabilityController,
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
