import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-flags-formatter',
  templateUrl: './flags-formatter.component.html',
  styleUrl: './flags-formatter.component.scss',
  imports: [NgFor]
})
export class FlagsFormatterComponent {
  @Input() flags: string[] = [];
}
