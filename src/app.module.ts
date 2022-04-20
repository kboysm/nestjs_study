import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CatModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { DbConfigModule } from './config/db.config';
import { TestUserModule } from './testuser/testuser.module';
import { AppController } from './app.controller';

@Module({
  imports: [UserModule, CatModule, DbConfigModule, AuthModule, TestUserModule],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {}
