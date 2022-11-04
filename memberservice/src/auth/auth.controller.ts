import { Body, Controller, Get, Post, UseGuards,Request } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local/local-auth.guard";
import { signInDto } from "./signin.dto";




@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() signIndto:signInDto,@Request() req:any ): Promise<any> {

        return this.authService.signIn(signIndto,req);
    }

    // @Get()
    // @MessagePattern({ cmd: 'hello' })
    // hello(input?: any): string {
    //     console.log('req', input);

    //     return `Hello, ${input.name || 'there'}!`;
    // }

    // @MessagePattern({ cmd: 'auths' })
    // hello2():boolean{
    //     console.log('req test');

    //     return false
    // }

    @MessagePattern({ cmd: 'authcheck' })
    authcheck(input) {
        console.log('reqsss');

        return this.authService.authcheck(input.jwt);
    }




}