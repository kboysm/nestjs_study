import { Module } from '@nestjs/common';
import { TestUserServiceController } from './testuser.controller';
import { TestUserService } from './testuser.service';

@Module({
  providers: [TestUserService],
  controllers: [TestUserServiceController],
  exports: [TestUserService]
})
export class TestUserModule {}
