import { Component, input } from '@angular/core';

@Component({
  selector: 'app-flags-formatter',
  templateUrl: './flags-formatter.component.html',
  styleUrl: './flags-formatter.component.scss'
})
export class FlagsFormatterComponent {
  readonly flags = input<string[]>([]);
}
