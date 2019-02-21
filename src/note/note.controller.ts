import { Controller, Post, Body, Get, Param, Delete, Put, UsePipes, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteDTO } from './note.dto';
import { User } from 'src/user/user.decorator';
import { AuthGuard } from 'src/common/auth.guard';

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

  @Post('/create')
  @UseGuards(AuthGuard)
  create(@User('id') user: string, @Body() data: NoteDTO) {
    return this.noteService.create(user, data);
  }

  @Put('/:id/update')
  @UseGuards(AuthGuard)
  update(@User('id') user: string, @Param('id') noteId: string, @Body() data: Partial<NoteDTO>) {
    return this.noteService.update(user, noteId, data);
  }

  @Delete('/:id/delete')
  @UseGuards(AuthGuard)
  destroy(@User('id') user: string, @Param('id') id: string) {
    return this.noteService.destroy(user, id);
  }
}
