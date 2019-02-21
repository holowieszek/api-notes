import { Injectable, NestInterceptor, ExecutionContext, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const now = Date.now();
    const method = req.method;
    const url = req.url;

    return call$.pipe(
      tap(() => {
        Logger.log(
          `${method} ${url} ${Date.now() - now}`,
          context.getClass().name,
        )
      })
    );
  }
}