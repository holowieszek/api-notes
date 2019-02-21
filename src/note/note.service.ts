import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEntity } from './note.entity';
import { Repository } from 'typeorm';
import { NoteDTO } from './note.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
    
  async showAll(userId: string) {
    return await this.noteRepository.find({ where: { author: userId }});
  }

  async showById(userId: string, noteId: string) {
    const note = await this.noteRepository.findOne({ where: { author: userId, id: noteId }});

    if (!note) {
      throw new HttpException('Note not found!', HttpStatus.BAD_REQUEST);
    }

    return note;
  }

  async create(userId: string, data: NoteDTO) {
    const user = await this.userRepository.findOne({ where: { id: userId }});
    const note = await this.noteRepository.create({ ...data, author: user });

    await this.noteRepository.save(note);
    return note.toResponseObject();
  }

  async update(userId: string, noteId: string, data: Partial<NoteDTO>) {
    let note = await this.noteRepository.findOne({ where: { author: userId, id: noteId }});

    if (!note) {
      throw new HttpException('Note not found!', HttpStatus.BAD_REQUEST);
    }

    await this.noteRepository.update(noteId, data);
    note = await this.noteRepository.findOne({ where: { author: userId, id: noteId }});

    return note;
  }

  async destroy(userId: string, noteId: string) {
    const note = await this.noteRepository.findOne({ where: { author: userId, id: noteId }});

    if (!note) {
      throw new HttpException('Note not found!', HttpStatus.BAD_REQUEST);
    }

    return this.noteRepository.delete(noteId);
  }
}
