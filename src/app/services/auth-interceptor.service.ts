import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from './login.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const loginService = inject(LoginService);
  const token = loginService.getToken(); // Method to get the token

  if (token) {
    const cloned = req.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });

    return next(cloned);
  }

  return next(req);
};
