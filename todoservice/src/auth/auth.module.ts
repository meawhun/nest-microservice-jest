import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3003
      }
    }])


  ],

  controllers: [AuthController],
  providers: [AuthService,AuthGuard,
    ],
  exports: [AuthService]
})
export class AuthModule {}
