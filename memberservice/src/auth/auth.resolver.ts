import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Authz } from './entities/auth.entity';
import { Jwtsign } from './entities/jwt.schema';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local/local-auth.guard';

@Resolver(() => Authz,)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // @Query(() => Jwtsign, { name: 'login_get_auth' })
  // @UseGuards(LocalAuthGuard)
  // async login(@Args('username', { type: () => String }) username: string, @Args('password', { type: () => String }) password: string) {
  //   const result = await this.authService.validateUser(username, password);
  //   if (!result) {
  //     return { accessToken: "null", username: "null", email: "null" };
  //   }
  //   return this.authService.signIn(result);
  // }

  
  // @Query(() => String, { name: 'check_auth' })
  // @UseGuards(JwtAuthGuard)
  // async testt(@Args('username', { type: () => String }) username: string) {
  //   return username
  // }
  
}
