import { ForeignKey, BelongsTo, DataType, Model, Table, Column } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from 'src/roles/user-roles.model';
import { User } from 'src/users/users.model';

interface PostCreationAttributes {
    title: string;
    content: string;
    userId: number;
    image: string;
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttributes> {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;
    
    @Column({type: DataType.STRING, allowNull: false})
    title: string;
    
    @Column({type: DataType.STRING, allowNull: false})
    content: string;
    
    @Column({type: DataType.STRING, allowNull: true})
    image: string;
    
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: true})
    userId: number;

    @BelongsTo(() => User)
    author: User;
}