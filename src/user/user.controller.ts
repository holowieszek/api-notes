import { Controller, Post, Body } from '@nestjs/common';

@Controller('api/users')
export class UserController {
  @Post('login')
  login(@Body() data) {
    return 'login';
  }

  @Post('register')
  register(@Body() data) {
    return 'register';
  }
}
