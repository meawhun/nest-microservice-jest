import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsString, IsNotEmpty, IsDate, IsEmpty, IsOptional, Validate, IsISO8601 } from 'class-validator';
import { IsUserFound } from '../Isuserhave';


export class UpdateTodoDto {

    @IsString()
    @IsOptional()
    todo_name?: string;

    @IsString()
    @IsOptional()
    todo_description?: string;

    @IsISO8601()
    @IsOptional()
    start_date?: string;

    @IsISO8601()
    @IsOptional()
    end_date?: string;


    @IsString()
    @IsOptional()
    @IsUserFound('IsUserFound')
    // @IsUser({ message: 'User does not exist' })
    assignee?: string;
}
