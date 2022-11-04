import { Module } from '@nestjs/common';
import { GqlrequestService } from './gqlrequest.service';

@Module({
  controllers: [],
  providers: [GqlrequestService],
  exports: [GqlrequestService],
})
export class GqlrequestModule {}
