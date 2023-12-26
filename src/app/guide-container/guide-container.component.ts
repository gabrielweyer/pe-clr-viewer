import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-guide-container',
  templateUrl: './guide-container.component.html',
  styleUrls: ['./guide-container.component.scss'],
  standalone: true,
  imports: [LinkComponent, NgIf]
})
export class GuideContainerComponent {
  public showGuide = false;

  handleShowGuide() {
    this.showGuide = !this.showGuide;
  }
}
