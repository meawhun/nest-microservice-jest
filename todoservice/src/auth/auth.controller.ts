import { Controller, Get, Inject, Param, Headers, UseGuards } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {
  
   }

  @UseGuards(AuthGuard)
  @Get('/authcheck')
  async getHello(@Headers() headers) {
    const auth = headers.authorization.split(' ')[1];
    const res = await this.authService.authget(auth);    
    return res
  }


}
