import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "src/user/user.entity";

@Entity('notes')
export class NoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @ManyToOne(type => UserEntity, author => author.notes)
  author: UserEntity;

  toResponseObject() {
    const { id, title, description, created, updated } = this;
    const responseObject = { id, title, description, created, updated };

    return responseObject;
  }
}