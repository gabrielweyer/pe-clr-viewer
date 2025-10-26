import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from './store.service';

@Injectable()
export class PortableExecutableGuard  {
  private readonly store = inject(StoreService);
  private readonly router = inject(Router);


  canActivate() {
    const canActivate = !!this.store.getPortableExecutable();

    if (!canActivate) {
      this.router.navigate(['home']);
    }

    return canActivate;
  }
}
