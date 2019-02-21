import { IsNotEmpty, MinLength } from "class-validator";

export class UserDTO {
  @IsNotEmpty({
    message: "Username can\'t be empty!"
  })
  @MinLength(6, {
    message: 'Username must be longer than or equal to 6 characters'
  })
  username: string;

  @IsNotEmpty({
    message: "Password can\'t be empty!"
  })
  @MinLength(8, {
    message: 'Username must be longer than or equal to 8 characters'
  })
  password: string;
}

export class UserRO {
  id: string;
  created: Date;
  username: string;
  token?: string;
}