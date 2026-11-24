
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

// Виведення інформації про HTTP-запити
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('[HTTP]', req.method, req.url);

  return next(req).pipe(
    catchError(error => {
      console.error('[HTTP помилка]', req.url, error);
      return throwError(() => error);
    })
  );
};
