import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { merge } from 'lodash';
import { KakaoAuthGuardOptions, kakaoGuardDefaultOptions } from './kakao.types';

@Injectable()
class KakaoAuthGuard extends AuthGuard('kakao') {
  constructor(options?: KakaoAuthGuardOptions) {
    super(
      merge(kakaoGuardDefaultOptions, options, {
        property: 'hybridAuthResult',
      }),
    );
  }
}

export function UseKakaoAuth(options?: KakaoAuthGuardOptions) {
  return UseGuards(new KakaoAuthGuard(options));
}
