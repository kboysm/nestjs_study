import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CatModule } from './cats/cats.module';

import { DbConfigModule } from './config/db.config';

@Module({
  imports: [UserModule, CatModule, DbConfigModule],
  providers: [AppService],
})
export class AppModule {}
