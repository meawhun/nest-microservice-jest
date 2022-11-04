import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Jwtsign {
  @Field(() => String, { description: 'username' })
  username: string

    @Field(() => String, { description: 'email' })
    email: string

    @Field(() => String, { description: 'token' })
    accessToken: string
}

