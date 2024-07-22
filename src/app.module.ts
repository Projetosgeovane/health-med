import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AvailabilityModule } from './modules/availability/domain/availability.module';

@Module({
  imports: [UserModule, AvailabilityModule],
})
export class AppModule { }
