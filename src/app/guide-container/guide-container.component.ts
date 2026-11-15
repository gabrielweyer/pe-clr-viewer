import { Component, ChangeDetectionStrategy } from '@angular/core';

import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-guide-container',
  templateUrl: './guide-container.component.html',
  styleUrl: './guide-container.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [LinkComponent]
})
export class GuideContainerComponent {
  public showGuide = false;

  handleShowGuide() {
    this.showGuide = !this.showGuide;
  }
}
