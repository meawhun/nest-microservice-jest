import { Module } from '@nestjs/common';
import { GqlrequestService } from './gqlrequest.service';

@Module({
  providers: [ GqlrequestService],
  exports: [ GqlrequestService]
})
export class GqlrequestModule {}
