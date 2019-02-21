import { Controller, Post, Body } from '@nestjs/common';
import { NoteService } from './note.service';

@Controller('api/notes')
export class NoteController {
  constructor(
    private readonly noteService: NoteService
  ) {}
  
  @Post('create')
  create(@Body() data) {
    return this.noteService.create(data);
  }
}
