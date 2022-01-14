import { PortableExecutableConstants } from './../models/portable-executable-constants';
import { Component, Input } from '@angular/core';
import { PortableExecutable } from '../models/portable-executable';

@Component({
  selector: 'app-legend-headers',
  templateUrl: './legend-headers.component.html',
  styleUrls: ['./legend-headers.component.scss']
})
export class LegendHeadersComponent {
  @Input() pe!: PortableExecutable;

  peConstants = PortableExecutableConstants;
}
