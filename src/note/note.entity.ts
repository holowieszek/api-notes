import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { UserEntity } from "src/user/user.entity";
import { FileEntity } from "src/upload/upload.entity";

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

  @OneToMany(type => FileEntity, file => file.id)
  files: FileEntity[];

  toResponseObject() {
    const { id, title, description, created, updated } = this;
    const responseObject = { id, title, description, created, updated };

    return responseObject;
  }
}