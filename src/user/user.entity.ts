import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert } from 'typeorm';
import { UserRO } from './user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { id, created, username, token } = this;
    const responseObject: UserRO = { id, created, username };

    if (showToken) {
      responseObject.token = token;
    }
    return responseObject;
  }

  async comparePassword(attemptPassword: string) {
    return bcrypt.compare(attemptPassword, this.password);
  }

  private get token() {
    const { id, username } = this;
    return jwt.sign({
      id, username
    }, process.env.SECRET, {
      expiresIn: '7d'
    })
  }
}