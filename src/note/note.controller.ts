import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { AuthGuard } from 'src/common/auth.guard';
import { NoteDTO } from './note.dto';
import { User } from 'src/user/user.decorator';

@Controller('api/notes')
export class NoteController {
  constructor(
    private readonly noteService: NoteService
  ) {}
  
  @Post('create')
  @UseGuards(AuthGuard)
  create(@User('id') user, @Body() data: NoteDTO) {
    console.log(user);
    return this.noteService.create(user, data);
  }
}
