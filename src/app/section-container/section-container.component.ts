import { Component, model } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-section-container',
  templateUrl: './section-container.component.html',
  styleUrl: './section-container.component.scss',
  imports: [NgClass]
})
export class SectionContainerComponent {
  public readonly isExpanded = model(true);

  public toggleIsExpanded(): void {
    this.isExpanded.update(isExpanded => !isExpanded);
  }
}
