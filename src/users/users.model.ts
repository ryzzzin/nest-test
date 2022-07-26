import { HasMany, BelongsToMany, DataType, Model, Table, Column } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from 'src/roles/user-roles.model';
import { Role } from 'src/roles/roles.model';
import { Post } from 'src/posts/posts.model';

interface UserCreationAttributes {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttributes> {
    @ApiProperty({example: '1', description: 'User ID'})
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;
    
    @ApiProperty({example: 'username@example.com', description: 'User Email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    
    @ApiProperty({example: 'qwerty12345', description: 'User Password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
    
    @ApiProperty({example: 'true', description: 'Is User Banned'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;
    
    @ApiProperty({example: 'Bad behaviour', description: 'Ban reason'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Post)
    posts: Post[];
}