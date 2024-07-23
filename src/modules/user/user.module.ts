import { Module } from '@nestjs/common';
import { UserHttpModule } from './domain/infra/http/http.module';
import { UserPersistenceModule } from './domain/infra/persistence/persistence.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Env } from 'src/env';
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService<Env, true>) => {
        const public_key = configService.get('JWT_PUBLIC_KEY', { infer: true });
        const private_key = configService.get('JWT_PRIVATE_KEY', {
          infer: true,
        });
        return {
          signOptions: { algorithm: 'RS256' },
          publicKey: Buffer.from(public_key, 'base64').toString('utf-8'),
          privateKey: Buffer.from(private_key, 'base64').toString('utf-8'),
        };
      },
    }),
    UserHttpModule,
    UserPersistenceModule,
  ],
})
export class UserModule { }
