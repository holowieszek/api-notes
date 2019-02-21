import { Controller, Post, Body, UseGuards, Get, Param, Delete, Put } from '@nestjs/common';
import { NoteService } from './note.service';
import { AuthGuard } from 'src/common/auth.guard';
import { NoteDTO } from './note.dto';
import { User } from 'src/user/user.decorator';

@Controller('api/notes')
export class NoteController {
  constructor(
    private readonly noteService: NoteService
  ) {}
  
  @Get('/')
  @UseGuards(AuthGuard)
  showAll(@User('id') user: string) {
    return this.noteService.showAll(user);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  showById(@User('id') user: string, @Param('id') noteId: string) {
    return this.noteService.showById(user, noteId);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  create(@User('id') user: string, @Body() data: NoteDTO) {
    return this.noteService.create(user, data);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  update(@User('id') user: string, @Param('id') noteId: string, @Body() data: NoteDTO) {
    return this.noteService.update(user, noteId, data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  destroy(@User('id') user: string, @Param('id') id: string) {
    return this.noteService.destroy(user, id);
  }
}
