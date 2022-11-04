import { CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { lastValueFrom, take, timeout } from "rxjs";
import { AuthService } from "./auth.service";

export class AuthGuard implements CanActivate {
    constructor(
      @Inject('AUTH_CLIENT')
      public readonly client: ClientProxy
      // public authservice: AuthService
      // @Client({ transport: Transport.TCP })
      // private client: ClientProxy
    ) {}
  
    async canActivate(
      context: ExecutionContext,
    ): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
  
      try{                
        
        const res = this.client.send({cmd: 'authcheck' },{ jwt:req.headers['authorization']?.split(' ')[1]})
        const resp = await lastValueFrom(res)
        
        req.username = resp.username
        
        
        return resp;
      } catch(err) {        
        return false;
      }
    }
  }