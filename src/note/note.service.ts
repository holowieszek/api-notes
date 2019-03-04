import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEntity } from './note.entity';
import { Repository } from 'typeorm';
import { NoteDTO } from './note.dto';
import { UserEntity } from 'src/user/user.entity';
import { FileEntity } from 'src/upload/upload.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>
  ) {}
    
  async showAll(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId }});

    if (!user) {
      throw new HttpException('User doesn\'t exists!', HttpStatus.FORBIDDEN);
    }
    
    return await this.noteRepository.find({ where: { author: userId }});
  }

  async showById(userId: string, noteId: string) {
    const note = await this.noteRepository.findOne({ where: { author: userId, id: noteId }, relations: ['files']});

    if (!note) {
      throw new HttpException('Note not found!', HttpStatus.BAD_REQUEST);
    }

    return note;
  }

  async create(userId: string, files, data: NoteDTO) {

    const user = await this.userRepository.findOne({ where: { id: userId }});
    const note = await this.noteRepository.create({ ...data, author: user });

    await this.noteRepository.save(note);

    files.forEach(async file => {
      const { location, originalname } = file;
      const saveFile = await this.fileRepository.create({ location, originalname, note });
      await this.fileRepository.save(saveFile);
    });

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
