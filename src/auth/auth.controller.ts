import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserInput } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  create(@Body() loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }
}
