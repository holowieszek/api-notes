import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('notes')
export class NoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;
}