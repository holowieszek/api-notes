import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';

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

  toResponseObject() {
    const { id, created, username } = this;
    const responseObject = { id, created, username };

    return responseObject;
  }
}