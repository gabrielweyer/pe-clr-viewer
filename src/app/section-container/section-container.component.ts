import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-section-container',
  templateUrl: './section-container.component.html',
  styleUrl: './section-container.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgClass]
})
export class SectionContainerComponent {
  @Input()
  public isExpanded = true;

  public toggleIsExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }
}
