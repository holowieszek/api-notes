import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './note.entity';
import { AuthGuard } from 'src/common/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([NoteEntity])
  ],
  providers: [
    NoteService,
    // AuthGuard
  ],
  controllers: [NoteController]
})
export class NoteModule {}
