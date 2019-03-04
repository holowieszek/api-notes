import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './note.entity';
import { UserEntity } from 'src/user/user.entity';
import { AuthGuard } from 'src/common/auth.guard';
import { FileEntity } from 'src/upload/upload.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NoteEntity, UserEntity, FileEntity])
  ],
  providers: [
    NoteService,
    AuthGuard
  ],
  controllers: [NoteController]
})
export class NoteModule {}
