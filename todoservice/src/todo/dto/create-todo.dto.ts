import { IsString, IsNotEmpty, IsDate, IsEmpty, IsOptional, Validate, IsISO8601 } from 'class-validator';
import { IsUserFound } from '../Isuserhave';
export class CreateTodoDto {


    @IsString()
    todo_name?: string;

    @IsString()
    todo_description?: string;

    @IsISO8601()
    // @IsOptional()
    start_date?: any;

    @IsISO8601()
    // @IsOptional()
    end_date?: any;


    @IsString()
    @IsOptional()
    @IsUserFound('IsUserFound')
    // @IsUser({ message: 'User does not exist' })
    assignee?: string;
}

