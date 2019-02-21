import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class NoteDTO {
  @IsNotEmpty({
    message: "Title can\'t be empty!"
  })
  title: string;

  @IsNotEmpty({
    message: "Description can\'t be empty!"
  })
  description: string;
}