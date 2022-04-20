import { Body, Controller, Post } from '@nestjs/common';
import { TestUserService } from './testuser.service';


@Controller('testuser')
export class TestUserServiceController {

  constructor(private readonly testUserService: TestUserService) {}

}
