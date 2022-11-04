import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { GqlrequestModule } from 'src/gqlrequest/gqlrequest.module';
import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MemberModule } from 'src/member/member.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local/local.strategy';

@Module({
  imports: [GqlrequestModule, PassportModule,MemberModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {        
        return {
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRE') },
        }
      },
      
    }),
  ],
  controllers: [AuthController],
  providers: [AuthResolver, AuthService,JwtStrategy,LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
