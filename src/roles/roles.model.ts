import { BelongsToMany, DataType, Model, Table, Column } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from './user-roles.model';
import { User } from 'src/users/users.model';

interface RoleCreationAttributes {
    value: string;
    description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttributes> {
    @ApiProperty({example: '1', description: 'Role ID'})
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;
    
    @ApiProperty({example: 'ADMIN', description: 'Role Value'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;
    
    @ApiProperty({example: 'Administrator', description: 'Role Description'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}