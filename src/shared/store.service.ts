import { PortableExecutable } from './../app/models/portable-executable';
import { Injectable, signal } from '@angular/core';

@Injectable()
export class StoreService {
  private readonly pe = signal<PortableExecutable | undefined>(undefined);

  public readonly portableExecutable = this.pe.asReadonly();

  public setPortableExecutable(pe: PortableExecutable | undefined): void {
    this.pe.set(pe);
  }

  public getPortableExecutable(): PortableExecutable | undefined {
    return this.pe();
  }
}
