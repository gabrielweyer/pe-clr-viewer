import { PortableExecutable } from './../app/models/portable-executable';
import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {
  private pe: PortableExecutable | undefined;

  public setPortableExecutable(pe: PortableExecutable | undefined): void {
    this.pe = pe;
  }

  public getPortableExecutable(): PortableExecutable | undefined {
    return this.pe;
  }
}
