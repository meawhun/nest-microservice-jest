import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, map, Observable, timeout } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(
    @Inject('AUTH_CLIENT') 
    // private readonly client: ClientProxy
    public client: ClientProxy
    ){}

  async authget(auth): Promise<Observable<boolean>> {
    let res = this.client.send({ cmd: 'authcheck' }, {jwt:auth})
    const ress = await lastValueFrom(res)
      return ress;
    }

  
  
}
