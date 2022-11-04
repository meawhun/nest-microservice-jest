import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GqlrequestService } from '../gqlrequest/gqlrequest.service';

@Injectable()
export class TodoService {
  constructor(private readonly gqlrequestService: GqlrequestService) { }

  async getuser(username: string): Promise<any> {
    const data = await this.gqlrequestService.query(`query { users(where: {username: {_eq: "${username}"}}) { username }}`);
    return data.users;
  }

  recreateObject(obj) {
    var tostr = JSON.stringify(obj);
    return tostr.replace(/"(\w+)"\s*:/g, '$1:');
  }

  async create(createTodoDto: CreateTodoDto, username: string) {


    const dtocreate = {
      todo_name: createTodoDto.todo_name,
      todo_description: createTodoDto.todo_description,
      start_date: createTodoDto.start_date,
      end_date: createTodoDto.end_date,
      created_by : username,
      updated_by : username,
      assignee: createTodoDto.assignee
    
    };
    
    const command = `mutation MyMutation { insert_todos_one(object: ${this.recreateObject(dtocreate)}) { todo_id }}`;
    const data = await this.gqlrequestService.query(command);
    return data;
  }

  async findAll() {    
    const data = await this.gqlrequestService.query(`query {todos { todo_id todo_name todo_description start_date end_date created_by updated_by assignee }}`);
    return data.todos
  }

  async findOne(id: number) {
    const data = await this.gqlrequestService.query(`query {todos_by_pk(todo_id: ${id}) {updated_by todo_name todo_id todo_description start_date end_date created_by assignee}}`);

    return data;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, username: string) {
    const withoutid = {
      todo_name: updateTodoDto.todo_name,
      todo_description: updateTodoDto.todo_description,
      start_date: updateTodoDto.start_date,
      end_date: updateTodoDto.end_date,
      updated_by : username,
      assignee: updateTodoDto.assignee
    };

    const todoId = { todo_id: id }

    const command = `mutation { update_todos_by_pk(pk_columns: ${this.recreateObject(todoId)}, _set: ${this.recreateObject(withoutid)}) { todo_id }}`;
    const data = await this.gqlrequestService.query(command);
    return data;
  }

  async remove(id: number) {

    const command = `mutation MyMutation { delete_todos_by_pk(todo_id: ${id}) { todo_id }}`;
    const data = await this.gqlrequestService.query(command);
    return data
  }

  async user() {
    return "test";
  }
}
