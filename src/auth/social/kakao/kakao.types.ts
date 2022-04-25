import { Request } from 'express';
import {
  Profile,
  StrategyOption,
  StrategyOptionWithRequest,
} from 'passport-kakao';

type KakaoAuthStrategyOptionsWithoutRequest = {
  [K in keyof StrategyOption]: StrategyOption[K];
};

type KakaoAuthStrategyOptionsWithRequest = {
  [K in keyof StrategyOptionWithRequest]: StrategyOptionWithRequest[K];
};

export type KakaoAuthModuleOptions =
  | KakaoAuthStrategyOptionsWithoutRequest
  | KakaoAuthStrategyOptionsWithRequest;

export type KakaoAuthGuardOptions = Record<string, unknown>;

export const kakaoGuardDefaultOptions = {};

export interface KakaoAuthModuleOptionsFactory {
  createModuleOptions():
    | Promise<KakaoAuthModuleOptions>
    | KakaoAuthModuleOptions;
}

export interface KakaoAuthResult {
  originalRequest: Request;
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}
