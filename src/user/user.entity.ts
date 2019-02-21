import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';
import { UserRO } from './user.dto';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  created: Date;

  @Column({ unique: true })
  username: string;

  @Column('text')
  password: string;

  toResponseObject(): UserRO {
    const { id, created, username } = this;
    const responseObject = { id, created, username };

    return responseObject;
  }
}