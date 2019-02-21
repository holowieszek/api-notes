import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { AuthGuard } from 'src/common/auth.guard';

@Controller('api/notes')
export class NoteController {
  constructor(
    private readonly noteService: NoteService
  ) {}
  
  @Post('create')
  @UseGuards(AuthGuard)
  create(@Body() data) {
    return this.noteService.create(data);
  }
}
