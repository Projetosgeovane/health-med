import { Module } from '@nestjs/common';
import { UserHttpModule } from './domain/infra/http/http.module';
import { UserPersistenceModule } from './domain/infra/persistence/persistence.module';
@Module({
  imports: [UserHttpModule, UserPersistenceModule],
})
export class UserModule { }
