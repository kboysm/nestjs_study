import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TestUserModule } from '../testuser/testuser.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { HybridAuthModule } from '@nestjs-hybrid-auth/all';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TestUserModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '60s' },
    }),
    HybridAuthModule.forRootAsync({
      google: {
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          clientID: configService.get('GOOGLE_CLIENT_ID'),
          clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
          callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
          scope: ['email', 'profile'],
        })
      },
      facebook: {
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          clientID: configService.get('FACEBOOK_CLIENT_ID'),
          clientSecret: configService.get('FACEBOOK_CLIENT_SECRET'),
          callbackURL: configService.get('FACEBOOK_CALLBACK_URL'),
          profileFields: ['id', 'displayName', 'email', 'photos'],
        })
      }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
