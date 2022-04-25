import {
    createHybridAuthModule,
    INestHybridAuthModule,
  } from '@nestjs-hybrid-auth/core';
  import { KAKAO_HYBRID_AUTH_OPTIONS } from './kakao.constants';
  import { KakaoAuthStrategy } from './kakao.strategy';
  import { KakaoAuthModuleOptions } from './kakao.types';
  
  export const KakaoAuthModule: INestHybridAuthModule<KakaoAuthModuleOptions> =
    createHybridAuthModule<KakaoAuthModuleOptions>(
      KAKAO_HYBRID_AUTH_OPTIONS,
      KakaoAuthStrategy,
    );
  