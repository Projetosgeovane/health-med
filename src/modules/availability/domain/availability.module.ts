import { Module } from '@nestjs/common';
import { AvailabilityHttpModule } from './infra/http/http.module';
import { AvailabilityPersistenceModule } from './infra/persistence/persistence.module';

@Module({
  imports: [AvailabilityHttpModule, AvailabilityPersistenceModule],
})
export class AvailabilityModule { }
