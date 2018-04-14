import { Component } from '@angular/core';

@Component({
  selector: 'app-guide-container',
  templateUrl: './guide-container.component.html',
  styleUrls: ['./guide-container.component.scss']
})
export class GuideContainerComponent {
  public showGuide = false;

  handleShowGuide() {
    this.showGuide = !this.showGuide;
  }
}
