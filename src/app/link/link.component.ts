import { Component, input } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
  standalone: true
})
export class LinkComponent {
  readonly href = input.required<string>();
}
