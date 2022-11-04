import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsDate, IsEmpty, IsOptional, Validate, IsISO8601 } from 'class-validator';

@InputType()
export class CreateMemberInput {
  // @Field(() => String, { description: 'Example username' })
  
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
