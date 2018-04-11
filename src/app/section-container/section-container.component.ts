import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-container',
  templateUrl: './section-container.component.html',
  styleUrls: ['./section-container.component.scss']
})
export class SectionContainerComponent {
  @Input()
  public isExpanded = true;

  public toggleIsExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }
}
