import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { LoggingInterceptor } from './common/logging.interceptor';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpErrorFilter } from './common/http-error.filter';
import { NoteModule } from './note/note.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(),
    NoteModule,
    UploadModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
})
export class AppModule {}
