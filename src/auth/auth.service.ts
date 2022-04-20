import { Injectable } from '@nestjs/common';
import { LoginUserInput } from './dto';
import { TestUserService } from '../testuser/testuser.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private testUserService: TestUserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.testUserService.findOne(username);

    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
