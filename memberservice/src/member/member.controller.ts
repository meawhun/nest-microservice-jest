import { Controller, Get, Post, Body, Request, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
    constructor(private readonly memberService: MemberService) { }


    @Post('/register')
    createMember(@Body() createMemberInput: CreateMemberInput) {
        return this.memberService.create(createMemberInput);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/changepassword')
    updateMember(@Body() updateMemberInput: UpdateMemberInput,@Request() req : any) {
        
        return this.memberService.update(req.user, updateMemberInput);
    }
}