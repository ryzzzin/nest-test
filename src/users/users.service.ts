import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    

    constructor(@InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("ADMIN");
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user;
    }

    async addRoleToUser(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId, {include: {all: true}});
        const role = await this.roleService.getRoleByValue(dto.value);
        if(user && role){
            await user.$add('roles', role);
            return user;
        }
        throw new HttpException( 'User or role not found', 404); 
    }

    async banUser(dto: BanUserDto){
        const user = await this.userRepository.findByPk(dto.userId, {include: {all: true}});
        if(user){
            user.banned = true;
            user.banReason = dto.banReason;
            await user.save();
            return user;
        }
        throw new HttpException( 'User not found', 404); 
    }
    
}
