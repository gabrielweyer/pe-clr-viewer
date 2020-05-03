import { PortableExecutable } from './../app/models/portable-executable';
import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {
  private pe: PortableExecutable;

  public setPortableExecutable(pe: PortableExecutable): void {
    this.pe = pe;
  }

  public getPortableExecutable(): PortableExecutable {
    return this.pe;
  }
}
