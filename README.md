## 1장 controller 학습 내용

### controllers는 요청, 응답을 담당

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

## 2장 providers 학습 내용

### 컨트롤러는 http 요청을 처리하므로 더 복잡한 작업을 처리, SOLID 원칙을 따르는 것을 권장함

#### SOLID 원칙이란? [여기](<https://ko.wikipedia.org/wiki/SOLID_(%EA%B0%9D%EC%B2%B4_%EC%A7%80%ED%96%A5_%EC%84%A4%EA%B3%84)>).

### @Injectable() : 해당 Service가 Nest IoC 컨테이너에서 관리할 수 있는 클래스임을 선언하는 메타데이터를 첨부합니다. -> 컨트롤러에서 생성자를 통해서 주입 -> Dependency injection

### Property-based injection : 생성자가 아닌 class의 property로 인젝션 주입 -> 최상위 클래스가 여러 공급자에 의존하는 경우 생성자에서 하위 클래스의 super()를 하나하나 선언하는 것이 비효율 적일때 사용 -> 특수한 경우가 아니면 생성자 인젝션 주입을 선호해야함(권장사항)

## 3장 modules 학습 내용

### 각 응용 프로그램에는 루트 모듈인 하나 이상의 모듈이 존재한다. 루트 모듈은 nest가 애플리케이션 그래프를 빌드하는데 사용하는 시작점이다. nest가 모듈과 공급자 관계 및 종속성을 해결하는데 사용하는 내부 데이터 구조이다.

- providers : nest 인젝터에 의해 인스턴스화되고 해당 모듈에서 공유될 수 있는 제공자

- controllers : 인스턴스화해야 하는 해당 모듈에 정의된 컨트롤러

- imports : 다른 모듈에서 export한 공급자를 import한 목록

- exports : 다른 모듈에서 사용할 수 있도록 export한 공급자 목록

### Shared modules : cats모듈에서 사용하는 service를 다른 모듈에서 사용하고 싶은 경우 exports 리스트에 service를 추가하고 사용하고 싶은 다른 모듈에서 imports 리스트에 추가

### 모듈 @Global()는 모듈을 전역 범위로 만든다. 일반적으로 루트 또는 코어 모듈에서 한 번만 등록해야 한다.
