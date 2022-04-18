import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CatModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { DbConfigModule } from './config/db.config';

@Module({
  imports: [UserModule, CatModule, DbConfigModule, AuthModule],
  providers: [AppService],
})
export class AppModule {}
