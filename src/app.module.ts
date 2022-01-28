import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import DbConfig from './config/db.config';

@Module({
  imports: [UserModule, DbConfig],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
