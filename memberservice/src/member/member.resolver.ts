import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { Member } from './entities/member.entity';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';

@Resolver(() => Member)
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  // @Query(() => [Member], { name: 'member_find_all' })
  // findAll() {
  //   return this.memberService.findAll();
  // }

  // @Query(() => Member, { name: 'member_find_by_id' })
  // findonebyid(@Args('id', { type: () => Int }) id: number) {
  //   return this.memberService.findOnebyId(id);
  // }

  // @Query(() => Member, { name: 'member_find_by_name' })
  // findonebyname(@Args('username', { type: () => String }) username: string) {
  //   return this.memberService.findOnebyName(username);
  // }

  // @Mutation(() => Member, { name: 'member_insert' })
  // createMember(@Args('createMemberInput') createMemberInput: CreateMemberInput) {
  //   return this.memberService.create(createMemberInput);
  // }

  // @Mutation(() => Member , { name: 'member_update_password' ,nullable: true})
  // updateMember(@Args('updateMemberInput') updateMemberInput: UpdateMemberInput) {
  //   return this.memberService.update(updateMemberInput.id, updateMemberInput);
  // }




}
