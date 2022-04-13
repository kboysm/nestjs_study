## 1장 controller 학습 내용

- @HttpCode 데코레이터를 사용하면 return 및 httpStatusCode가 정상적이지 않다
- @Redirect 데코레이터를 사용하면 return 값으로 Redirect Url이 리턴된다
- @Body 데코레이터를 사용한 dto 객체를 벗어난 범위의 property가 추가된 요청을 보내면 초과된 범위의 property도 그대로 전달된다.

---

#### 객체의 범위를 벗어난 요청을 어떻게 처리할 것인가? -> ValidationPipe
