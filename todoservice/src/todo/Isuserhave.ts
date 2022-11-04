import {
    ValidatorConstraint,
    ValidationOptions,
    registerDecorator,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { request, gql } from 'graphql-request';
import { TodoService } from './todo.service';


@ValidatorConstraint()
export class IsKanaConstraint implements ValidatorConstraintInterface {
    async validate(text: string, args: ValidationArguments): Promise<boolean> {

        const query = gql`query { users(where: {username: {_eq: "${text}"}}) { username }}`;
        const data = await request('http://192.168.1.44:8080/v1/graphql', query);

        if (data.users[0]) {
            return true
        }else{
            console.log("not found");
            return false
        }
    }

    defaultMessage(args: ValidationArguments): string {
        return 'user assignee Not Found';
    }
}

export function IsUserFound(
    property: string,
    validationOptions?: ValidationOptions,
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'IsUserFound',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsKanaConstraint,
        });
    };
}