import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { GqlrequestModule } from './gqlrequest/gqlrequest.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [TodoModule, GqlrequestModule, AuthModule,
    ConfigModule.forRoot(),
    
  ],
  controllers: [AppController],
  providers: [AppService,
    // {
    //   provide: 'AUTH_CLIENT',
    //   useFactory: (configService: ConfigService) => {
    //     return ClientProxyFactory.create({
    //       transport: Transport.TCP,
    //       options: {
    //         host: '0.0.0.0',
    //         port: 3003,
    //       },
    //       });
    //   },
    //   inject: [ConfigService],
    // }
  ],
})
export class AppModule {}
