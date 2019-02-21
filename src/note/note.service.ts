import { Injectable } from '@nestjs/common';
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
    const note = await this.noteRepository.find({ where: { author: userId }});
    return note;
    
  }
  async create(userId: string, data: NoteDTO) {
    const user = await this.userRepository.findOne({ where: { id: userId }});
    const note = await this.noteRepository.create({ ...data, author: user });

    await this.noteRepository.save(note);
    return note.toResponseObject();
  }
}
