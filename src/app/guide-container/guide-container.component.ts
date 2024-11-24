import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-guide-container',
  templateUrl: './guide-container.component.html',
  styleUrl: './guide-container.component.scss',
  imports: [LinkComponent, NgIf]
})
export class GuideContainerComponent {
  public showGuide = false;

  handleShowGuide() {
    this.showGuide = !this.showGuide;
  }
}
