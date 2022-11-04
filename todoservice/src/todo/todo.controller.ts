import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from '../auth/auth.service';

@Controller('todo')
export class TodoController {
  constructor(
    private authService: AuthService,
    private readonly todoService: TodoService
    ) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Request() req,@Body() createTodoDto: CreateTodoDto) {
    console.log("req",req);
    
    return this.todoService.create(createTodoDto,req.username);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto,@Request() req) {
    return this.todoService.update(id, updateTodoDto,req.username);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoService.remove(+id);
  }

  @Get('/user/ttt')
  async user() {
    return await this.todoService.user();
  }
}
