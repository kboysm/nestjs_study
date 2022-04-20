import { Injectable } from '@nestjs/common';
import { LoginUserInput } from './dto';
import { TestUserService } from '../testuser/testuser.service';

@Injectable()
export class AuthService {
  constructor(private testUserService: TestUserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.testUserService.findOne(username);

    if( user && user.password === password) {
      const { password, username, ...rest} = user;
      return rest;
    }
    return null;
  }

  async login(loginUserInput: LoginUserInput) {
    return loginUserInput;
  }
}
