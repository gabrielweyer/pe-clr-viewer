import { Component, model } from '@angular/core';


@Component({
  selector: 'app-section-container',
  templateUrl: './section-container.component.html',
  styleUrl: './section-container.component.scss'
})
export class SectionContainerComponent {
  public readonly isExpanded = model(true);

  public toggleIsExpanded(): void {
    this.isExpanded.update(isExpanded => !isExpanded);
  }
}
