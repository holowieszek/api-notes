import { Controller, Post, Body } from '@nestjs/common';
import { UserDTO } from './user.dto';

@Controller('api/users')
export class UserController {
  @Post('login')
  login(@Body() data: UserDTO) {
    return data;
  }

  @Post('register')
  register(@Body() data: UserDTO) {
    return data;
  }
}
