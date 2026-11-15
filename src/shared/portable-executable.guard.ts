import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StoreService } from './store.service';

export const portableExecutableGuard: CanActivateFn = () => {
  const store = inject(StoreService);

  return store.getPortableExecutable() !== undefined || inject(Router).createUrlTree(['/home']);
};
