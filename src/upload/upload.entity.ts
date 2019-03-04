import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm";
import { NoteEntity } from "src/note/note.entity";

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column()
  originalname: string;

  @Column('text')
  location: string;

  @ManyToOne(type => NoteEntity, note => note.files)
  note: NoteEntity;
}