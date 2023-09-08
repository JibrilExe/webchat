import { CanActivateFn } from '@angular/router';

export const loggedOutGuard: CanActivateFn = (route, state) => {
  return true;
};
