import { CreateMemberInput } from './create-member.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsDate, IsEmpty, IsOptional, Validate, IsISO8601 } from 'class-validator';


@InputType()
export class UpdateMemberInput {

  // @Field(() => String)
  @IsString()
  @IsNotEmpty()
  oldpassword: string;
  
  // @Field(() => String)
  @IsString()
  @IsNotEmpty()
  password: string;
}
