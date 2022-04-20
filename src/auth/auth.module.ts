import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TestUserModule } from '../testuser/testuser.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TestUserModule, PassportModule, JwtModule.register({
    secret: 'test',
    signOptions: { expiresIn: '60s'}
  })],
  providers: [AuthService, LocalStrategy],
  exports: [ AuthService ]
})
export class AuthModule {}
