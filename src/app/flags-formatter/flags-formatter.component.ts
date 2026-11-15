import { Component, Input, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-flags-formatter',
  templateUrl: './flags-formatter.component.html',
  styleUrl: './flags-formatter.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: []
})
export class FlagsFormatterComponent {
  @Input() flags: string[] = [];
}
