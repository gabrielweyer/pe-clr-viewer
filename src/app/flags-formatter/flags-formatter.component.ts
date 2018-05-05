import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flags-formatter',
  templateUrl: './flags-formatter.component.html',
  styleUrls: ['./flags-formatter.component.scss']
})
export class FlagsFormatterComponent {
  @Input() flags: string[];
}
