import { Component, OnInit, Input } from '@angular/core';
import { PortableExecutableConstants } from '../models/portable-executable-constants';
import { PortableExecutable } from '../models/portable-executable';

@Component({
  selector: 'app-legend-text',
  templateUrl: './legend-text.component.html',
  styleUrls: ['./legend-text.component.scss']
})
export class LegendTextComponent {
  peConstants = PortableExecutableConstants;

  @Input() pe: PortableExecutable;
}
