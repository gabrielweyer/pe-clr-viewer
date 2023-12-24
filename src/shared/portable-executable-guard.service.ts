import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from './store.service';

@Injectable()
export class PortableExecutableGuard  {
  constructor(
    private readonly store: StoreService,
    private readonly router: Router) {}

  canActivate() {
    const canActivate = !!this.store.getPortableExecutable();

    if (!canActivate) {
      this.router.navigate(['home']);
    }

    return canActivate;
  }
}
