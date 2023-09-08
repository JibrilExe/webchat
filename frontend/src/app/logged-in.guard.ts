import { CanActivateFn } from '@angular/router';
import { LoginService } from './services/login.service';
import { inject } from '@angular/core';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService)
  console.log(login.logged_in)
  if(login.logged_in){
    return false;
  }
  return true;
};