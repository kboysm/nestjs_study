import { Body, Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { LoginUserInput } from './dto';
import { AuthService } from './auth.service';
import { FacebookAuthResult, GoogleAuthResult, UseFacebookAuth, UseGoogleAuth } from '@nestjs-hybrid-auth/all';
import { CreateUserDto } from '../user/dto/create-user.dto';

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

  @UseGoogleAuth()
  @Get('google')
  loginWithGoogle() {
    return 'Login with Google';
  }
  
  @UseGoogleAuth()
  @Get('google/callback')
  googleCallback(@Req() req, @Res({ passthrough: true }) res) {
    const result: GoogleAuthResult = req.hybridAuthResult;
    console.log(result);

    return 'test';
  }

  // facebook은 최초 access token 획득 시 permission scope를 전달해야 한다.
  @UseFacebookAuth({ scope: 'email' })
  @Get('facebook')
  loginWithFacebook() {
    return 'Login with Facebook';
  }

  @UseFacebookAuth()
  @Get('facebook/callback')
  facebookCallback(@Req() req, @Res({ passthrough: true }) res) {
    const result: FacebookAuthResult = req.hybridAuthResult;
    console.log(result)

    return 'test';
  }
}
