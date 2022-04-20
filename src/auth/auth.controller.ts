import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LoginUserInput } from './dto';
import { AuthService } from './auth.service';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  // create(@Body() loginUserInput: LoginUserInput) {
  create(@Request() req): any {
    // return this.authService.login(loginUserInput);
    return req.user;
  }

  async findOne() {}
}
