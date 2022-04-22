import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
// async canActivate(context: ExecutionContext) {
//   const result = (await super.canActivate(context)) as boolean;
//   const request = context.switchToHttp().getRequest();
//   await super.logIn(request);
//   return result;
// }
// AuthGuard의 인자가 local일 경우 passport-local, LocalStrategy
