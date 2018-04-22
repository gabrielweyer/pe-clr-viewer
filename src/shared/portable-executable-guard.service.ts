import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoreService } from './store.service';

@Injectable()
export class PortableExecutableGuard implements CanActivate {
  constructor(
    private readonly store: StoreService,
    private readonly router: Router) {}

  canActivate() {
    const canActivate: boolean = !!this.store.getPortableExecutable();

    if (!canActivate) {
      this.router.navigate(['home']);
    }

    return canActivate;
  }
}
