import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberResolver } from './member.resolver';
import { GqlrequestModule } from 'src/gqlrequest/gqlrequest.module';
import { MemberController } from './member.controller';

@Module({
  imports: [GqlrequestModule],
  controllers: [MemberController],
  providers: [MemberResolver, MemberService],
  exports: [MemberService]
})
export class MemberModule {}
