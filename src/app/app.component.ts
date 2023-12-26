import { Component } from '@angular/core';
import { PortableExecutable } from './models/portable-executable';
import { StoreService } from '../shared/store.service';
import { Router, RouterOutlet } from '@angular/router';
import { DisclaimerContainerComponent } from './disclaimer-container/disclaimer-container.component';
import { UploadContainerComponent } from './upload-container/upload-container.component';
import { GuideContainerComponent } from './guide-container/guide-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [GuideContainerComponent, UploadContainerComponent, RouterOutlet, DisclaimerContainerComponent]
})
export class AppComponent {
  constructor(private readonly store: StoreService, private readonly router: Router) {}

  fileRead(pe: PortableExecutable | undefined): void {
    this.store.setPortableExecutable(pe);
    this.router.navigate(['/see']);
  }
}
