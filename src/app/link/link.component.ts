import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class LinkComponent {
  @Input()
  href!: string;
}
