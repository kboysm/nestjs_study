## 1장 controller 학습 내용

- @HttpCode 데코레이터를 사용하면 return 및 httpStatusCode가 정상적이지 않다
- @Redirect 데코레이터를 사용하면 return 값으로 Redirect Url이 리턴된다
- @Body 데코레이터를 사용한 dto 객체를 벗어난 범위의 property가 추가된 요청을 보내면 초과된 범위의 property도 그대로 전달된다.

---

#### 객체의 범위를 벗어난 요청을 어떻게 처리할 것인가? -> ValidationPipe

```
export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}
```

- enableDebugMessages : true로 설정하면 유효성 검사기가 잘못된 경우 콘솔에 추가 경고 메시지를 인쇄합니다.

- skipUndefinedProperties : true로 설정하면 유효성 검사기가 유효성 검사 개체에서 null?인 모든 속성의 유효성 검사를 건너뜁니다.

- skipNullProperties : true로 설정하면 유효성 검사기가 유효성 검사 개체에서 null이거나 정의되지 않은 모든 속성의 유효성 검사를 건너뜁니다.

- skipMissingProperties : true로 설정하면 유효성 검사기가 유효성 검사 개체에서 누락된 모든 속성의 유효성 검사를 건너뜁니다.

- whitelist : true로 설정하면 유효성 검사기는 유효성 검사 데코레이터를 사용하지 않는 모든 속성의 유효성이 검사된(반환된) 객체를 제거합니다.

- forbidNonWhitelisted : true로 설정하면 화이트리스트에 없는 속성을 제거하는 대신 유효성 검사기가 예외를 throw합니다.

- forbidUnknownValues : true로 설정하면 알 수 없는 개체의 유효성을 검사하려는 시도가 즉시 실패합니다.

- disableErrorMessages : true로 설정하면 유효성 검사 오류가 클라이언트에 반환되지 않습니다.

- errorHttpStatusCode : 이 설정을 사용하면 오류가 발생한 경우 사용할 예외 유형을 지정할 수 있습니다. 기본적으로 BadRequestException이 발생합니다.

- exceptionFactory : 유효성 검사 오류의 배열을 가져오고 throw할 예외 개체를 반환합니다.

#### whitelist: true로 설정하고 controller의 Body 타입을 정의하는 dto 파일에서 class-validator를 사용하지 않은 옵션은 제거 된다. 위의 내 궁금증을 해결할 수 있다.
