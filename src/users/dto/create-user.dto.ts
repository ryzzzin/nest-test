import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'username@example.com', description: 'User Email' })
    @IsString({message: 'Email must be a string'})
    @IsEmail({}, {message: 'Email must be a valid email'})
    @IsNotEmpty({message: 'Email must be provided'})
    readonly email: string;
    @IsString({message: 'Password must be a string'})
    @Length(8, 128, {message: 'Password must be between 8 and 128 characters'})
    @IsNotEmpty({message: 'Password must be provided'})
    @ApiProperty({ example: 'qwerty12345', description: 'User Password' })
    readonly password: string;
}