import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GqlrequestModule } from './gqlrequest/gqlrequest.module';
import { ApolloDriver } from '@nestjs/apollo';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GqlrequestModule,
    // GraphQLModule.forRoot({
    //   driver: ApolloDriver,
    //   autoSchemaFile: true
    // }),
    MemberModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
