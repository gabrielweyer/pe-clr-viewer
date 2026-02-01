import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-flags-formatter',
  templateUrl: './flags-formatter.component.html',
  styleUrl: './flags-formatter.component.scss',
  imports: []
})
export class FlagsFormatterComponent {
  @Input() flags: string[] = [];
}
