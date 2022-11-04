import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { GqlrequestModule } from '../gqlrequest/gqlrequest.module';
// import { Todocontroller } from './my.service';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('Todocontroller', () => {
  let todocontroller: TodoController;
  let todoservice: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GqlrequestModule,
        ClientsModule.register([{
          name: 'AUTH_CLIENT',
          transport: Transport.TCP,
          options: {
            host: '0.0.0.0',
            port: 3003
          }
        }]),
        AuthModule],
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();
    todoservice = module.get<TodoService>(TodoService);
    todocontroller = module.get<TodoController>(TodoController);
  });


  describe('findAll', () => {
    it('should be findAll result', async () => {
      const result = await todocontroller.findAll();
      const mockres = [
        {
          assignee: null,
          created_by: 'user1',
          end_date: '2022-11-05',
          start_date: '2022-11-03',
          todo_description: 'new todo_description1',
          todo_id: 27,
          todo_name: 'new todo1',
          updated_by: 'user1',
        },
      ]; 
      jest.spyOn(todoservice, 'findAll').mockImplementation(async () => result);
      
      expect(await todocontroller.findAll()).toEqual(mockres);
    });
  });

  describe('findOne', () => {
    it('should be findOne result', async () => {
      const todoid = 27;
      const result = await todocontroller.findOne(todoid);
      const mockres = {
        "todos_by_pk": {
            "updated_by": "user1",
            "todo_name": "new todo1",
            "todo_id": 27,
            "todo_description": "new todo_description1",
            "start_date": "2022-11-03",
            "end_date": "2022-11-05",
            "created_by": "user1",
            "assignee": null
        }
    }; 
      jest.spyOn(todoservice, 'findOne').mockImplementation(async () => result);
      
      expect(await todocontroller.findOne(todoid)).toEqual(mockres);
    });
  });

  describe('create', () => {
    it('should be create result', async () => {
      const createTodoDto = {
        "todo_name": "new todo1",
        "todo_description": "new todo_description1",
        "start_date": "2022-11-03",
        "end_date": "2022-11-05"
    };
      const username = {"username":"user1"};
      
      const result = await todocontroller.create(username,createTodoDto);
      
      const mockres = {
        "insert_todos_one": {
          "todo_id": 31
      }
    }; 
      jest.spyOn(todoservice, 'create').mockImplementation(async () => result);
      
      expect(await todocontroller.create(username,createTodoDto)).toEqual(mockres);
    });
  });

  describe('update', () => {
    it('should be update result', async () => {
      const todoid = 27;
      const updateTodoDto = {
        "todo_name": "new todo1",
        "todo_description": "new todo_description1",
        "start_date": "2022-11-03",
        "end_date": "2022-11-05"
    };
      const username = {"username":"user1"};
      
      const result = await todocontroller.update(todoid,updateTodoDto,username);
      
      const mockres = {
        "update_todos_by_pk": {
          "todo_id": 27
      }
    }; 
      jest.spyOn(todoservice, 'update').mockImplementation(async () => result);
      
      expect(await todocontroller.update(todoid,updateTodoDto,username)).toEqual(mockres);
    });
  });

  describe('remove', () => {
    it('should be remove result', async () => {
      const todoid = 27;      
      const result = await todocontroller.remove(todoid);
      
      const mockres = {
        "delete_todos_by_pk": {
          "todo_id": 27
      }
    }; 
      jest.spyOn(todoservice, 'remove').mockImplementation(async () => result);
      
      expect(await todocontroller.remove(todoid)).toEqual(mockres);
    });
  });

});