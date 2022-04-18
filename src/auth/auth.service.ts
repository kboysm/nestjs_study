import { Injectable } from '@nestjs/common';
import { LoginUserInput } from './dto';

@Injectable()
export class AuthService {
  async login(loginUserInput: LoginUserInput) {
    return loginUserInput;
  }
}
