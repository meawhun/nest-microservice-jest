import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Authz {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}


