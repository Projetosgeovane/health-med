import { Module } from '@nestjs/common';
import { HttpModule } from './domain/infra/http/http.module';
import { PersistenceModule } from './domain/infra/persistence/persistence.module';

@Module({
  imports: [HttpModule, PersistenceModule],
})
export class UserModule { }
