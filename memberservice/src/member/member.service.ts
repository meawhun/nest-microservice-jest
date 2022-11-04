import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { GqlrequestService } from 'src/gqlrequest/gqlrequest.service';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { request, gql } from 'graphql-request';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MemberService {
  constructor(
    private gqlService: GqlrequestService,
  ) { }

   renameKey ( obj, oldKey, newKey ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }

  async findAll() {
    const query = `query {users {  users_id  username  email}}`
      const data = await this.gqlService.query(query);
      if (data.users == null || data.users == undefined) {
        throw new Error('User not found');
      }
      data.users.forEach(element => {
        this.renameKey(element, 'users_id', 'id');
      });
      // console.log(data);
      
      return data.users;
      
    // return [{ id: 1, username: 'John Doe' }, { id: 2, username: 'Jane Doe2' }];
  }

  async findOnebyId(id: number) {
    const query = `query {users_by_pk(users_id: ${id}) {username email password users_id}}`
      const data = await this.gqlService.query(query);
      console.log(data.users_by_pk);
      if (data.users_by_pk == null || data.users_by_pk == undefined) {
        return new ConflictException({
          message : ['user already exists'],
      });    
      }
      return {id: data.users_by_pk.users_id, username: data.users_by_pk.username, email: data.users_by_pk.email, status:"success", message:""};
  }

  async findOnebyName(username: string) {
    const query = `query {users(where: {username: {_eq: "${username}"}}) {username email users_id}}`
      const data = await this.gqlService.query(query);
      if (data.users[0] == null || data.users[0] == undefined) {
        return null;
      }else{
      return { id: data.users[0].users_id, username: data.users[0].username, email: data.users[0].email, status:"success", message:"" };
      }
  }

  async findOnebyEmail(email: string) {
    const query = `query {users(where: {email: {_eq: "${email}"}}) {username email users_id}}`
      const data = await this.gqlService.query(query);
      console.log("one"+data.users);
      if (data.users[0] == null || data.users[0] == undefined) {
        return null;
      }else{
        return { id: data.users[0].users_id, username: data.users[0].username, email: data.users[0].email , status:"success", message:""};
      }
  }

  async create(createMemberInput: CreateMemberInput) {
    const {
      username,
      email,
      password,
    } = createMemberInput;

    const existingUser = await this.findOnebyName(username) || await this.findOnebyEmail(email)
    if (existingUser || existingUser != null) {
      throw new NotAcceptableException(
        'Username or email already exists',
      )
    }
    const hashedPassword = await bcrypt.hashSync(password, 10)

    const query = `mutation {insert_users(objects: {username: "${username}", email: "${email}", password: "${hashedPassword}"}) {returning {username email users_id} affected_rows } }`
    
    const data = await this.gqlService.query(query);
    console.log(data);
    
    return { affected_rows: data.insert_users.affected_rows, id: data.insert_users.returning[0].users_id, username: data.insert_users.returning[0].username, email: data.insert_users.returning[0].email, status:"success", message:"" };
  }

  async findOneforLogin(username: string) {
    const query = `query {users(where: {username: {_eq: "${username}"}}) {username email password users_id}}`
      const data = await this.gqlService.query(query);
      if (data.users[0] == null || data.users[0] == undefined) {
        return null;
      }else{
      return { id: data.users[0].users_id, username: data.users[0].username, email: data.users[0].email, password: data.users[0].password };
      }
  }


  async update(id: any, updateMemberInput: UpdateMemberInput) {
    const {
      oldpassword,
      password,
    } = updateMemberInput;


    const queryuser = `query { users_by_pk(users_id: ${id.userId}) {  email  password  username  users_id  }}`
    
    const user = await this.gqlService.query(queryuser);
    
    if (!(user && await bcrypt.compare(oldpassword, user.users_by_pk.password))) {
      return {message: "Old password is incorrect" , status:"error"};
    }
   
    const hashedPassword = await bcrypt.hashSync(password, 10)
    const query = `mutation {update_users(where: {users_id: {_eq: ${id.userId}}}, _set: {password: "${hashedPassword}"}) {returning {username email users_id} affected_rows } }`
    
    const data = await this.gqlService.query(query);
    
    return { affected_rows: data.update_users.affected_rows, id: data.update_users.returning[0].users_id, username: data.update_users.returning[0].username, email: data.update_users.returning[0].email, status:"success", message:"update password" };
  }


}
