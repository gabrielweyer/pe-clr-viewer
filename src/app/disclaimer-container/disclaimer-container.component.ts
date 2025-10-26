import { Component, inject } from '@angular/core';
import { AppConfigService } from '../../shared/app.config';
import { SlicePipe } from '@angular/common';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-disclaimer-container',
  templateUrl: './disclaimer-container.component.html',
  styleUrl: './disclaimer-container.component.scss',
  imports: [LinkComponent, SlicePipe]
})
export class DisclaimerContainerComponent {
  public build: string;
  public commit: string;

  constructor() {
    const appConfig = inject(AppConfigService);

    this.build = appConfig.build;
    this.commit = appConfig.commit;
  }
}
