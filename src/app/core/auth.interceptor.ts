import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);

    return next(req).pipe(
        catchError(error => {
            if (error.status === 401) {
                localStorage.removeItem('access_token'); // Remove o token
                router.navigate(['/login']); // Redireciona para login
            }
            return throwError(() => error);
        })
    );
};
