import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlrequestService } from 'src/gqlrequest/gqlrequest.service';
import { MemberService } from 'src/member/member.service';
// import { JwtPayload } from './jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { signInDto } from './signin.dto';


@Injectable()
export class AuthService {
  constructor(
    public jwtService: JwtService,
    private memberService: MemberService
  ) { }
  
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.memberService.findOneforLogin(username)
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user
      delete user.password;
      // console.log("result",result);

      return result
    }

    return null
  }

  async signIn(signIndto:signInDto,req:any) {
    
    const payload = {
      username: signIndto.username,
      users_id: req.user.id,
    }

    const accessToken = await this.jwtService.sign(payload)
    
    return {
      username: signIndto.username,
      accessToken: accessToken,
    }

  }

  async authcheck(jwt:string) {
    try {
      const res = this.jwtService.verify(jwt);
      console.log('res', res);
      return res;
    } catch (error) {
      console.log('error', error);
      return false;
    }

  }
//   async authcheck(jwt:string) {
//     return true
  
// }

}
