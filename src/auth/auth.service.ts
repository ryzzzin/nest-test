import { Body, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as crypto from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
    
    constructor(private userService: UsersService,
        private jwtService: JwtService) {}

    async login(@Body() userDto: CreateUserDto){
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async register(@Body() userDto: CreateUserDto){
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if(candidate){
            throw new HttpException('User already exists', 409);
        }
        const hashedPassword = await crypto.hash(userDto.password, 10);
        const user = await this.userService.createUser({...userDto, password: hashedPassword});
        return this.generateToken(user);
    }

    async generateToken(user: User){
        const payload = {email: user.email, sub: user.id, roles: user.roles};
        const accessToken = this.jwtService.sign(payload);
        return {accessToken};
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await crypto.compare(userDto.password, user.password);
        if(user && passwordEquals) return user;
        throw new UnauthorizedException('Invalid credentials');
    }
}
