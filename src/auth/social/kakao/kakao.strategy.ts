import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { merge } from 'lodash';
import { Strategy } from 'passport-kakao';
import { KAKAO_HYBRID_AUTH_OPTIONS } from './kakao.constants';
import { KakaoAuthModuleOptions } from './kakao.types';

@Injectable()
export class KakaoAuthStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    @Inject(KAKAO_HYBRID_AUTH_OPTIONS) options: KakaoAuthModuleOptions,
  ) {
    super(
      merge(options, {
        passReqToCallback: true,
      }),
    );
  }

  async validate(
    originalRequest: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {
    const kakao_account = profile._json.kakao_account;

    return {
      originalRequest,
      accessToken,
      refreshToken,
      profile: {
        id: profile.id,
        emails: Array<{ value: string }>({ value: kakao_account.email }),
        photos: Array<{ value: string }>({
          value: kakao_account.profile.profile_image_url,
        }),
      },
    };
  }
}
