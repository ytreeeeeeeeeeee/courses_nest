import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return {
          status: 'success',
          data,
        };
      }),
      catchError((err) => {
        if (err instanceof HttpException) {
          throw new HttpException(err.message, err.getStatus());
        }

        throw new InternalServerErrorException(err.message);
      }),
    );
  }
}
