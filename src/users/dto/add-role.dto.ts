import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class AddRoleDto{
    @IsString({message: 'Role value must be a string'})
    @IsNotEmpty({message: 'Role value must be provided'})
    readonly value: string;

    @IsNumber({}, {message: 'User id must be a number'})
    @IsNotEmpty({message: 'User id must be provided'})
    readonly userId: number;
}