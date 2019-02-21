import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteDTO } from './note.dto';
import { User } from 'src/user/user.decorator';

@Controller('api/notes')
export class NoteController {
  constructor(
    private readonly noteService: NoteService
  ) {}
  
  @Get('/')
  showAll(@User('id') user: string) {
    return this.noteService.showAll(user);
  }

  @Get('/:id')
  showById(@User('id') user: string, @Param('id') noteId: string) {
    return this.noteService.showById(user, noteId);
  }

  @Post('/create')
  create(@User('id') user: string, @Body() data: NoteDTO) {
    return this.noteService.create(user, data);
  }

  @Put('/:id/update')
  update(@User('id') user: string, @Param('id') noteId: string, @Body() data: NoteDTO) {
    return this.noteService.update(user, noteId, data);
  }

  @Delete('/:id/delete')
  destroy(@User('id') user: string, @Param('id') id: string) {
    return this.noteService.destroy(user, id);
  }
}
