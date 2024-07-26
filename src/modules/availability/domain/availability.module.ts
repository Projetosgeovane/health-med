import { Module } from '@nestjs/common';
import { AvailabilityPersistenceModule } from './infra/persistence/persistence.module';
import { AvailabilityHttpModule } from './infra/http/presenters/http.module';

@Module({
  imports: [AvailabilityHttpModule, AvailabilityPersistenceModule],
})
export class AvailabilityModule { }
