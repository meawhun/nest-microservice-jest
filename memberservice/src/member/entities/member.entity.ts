import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Member {
  @Field(() => String, { description: 'Example status' })
  status: string

  @Field(() => String, { description: 'Example message' })
  message: string
  
  @Field(() => Int, { description: 'Example field id', nullable: true })
  id?: number;

  @Field(() => String, { description: 'Example field name',nullable: true })
  username?: string;

  @Field(() => String, { description: 'Example field email' ,nullable: true})
  email?: string;
}
