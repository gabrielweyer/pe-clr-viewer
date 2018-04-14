import { Component } from '@angular/core';
import { PortableExecutable } from './models/portable-executable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public pe: PortableExecutable;

  fileRead(pe: PortableExecutable): void {
    if (pe) {
      this.pe = pe;
    }
  }
}
