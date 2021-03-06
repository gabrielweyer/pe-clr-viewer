import { Component } from '@angular/core';
import { PortableExecutable } from './models/portable-executable';
import { StoreService } from '../shared/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly store: StoreService, private readonly router: Router) {}

  fileRead(pe: PortableExecutable | undefined): void {
    this.store.setPortableExecutable(pe);
    this.router.navigate(['/see']);
  }
}
