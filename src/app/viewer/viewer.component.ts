import { PortableExecutable } from './../models/portable-executable';
import { Component, Input } from '@angular/core';
import { PortableExecutableConstants } from '../models/portable-executable-constants';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent {
  @Input() pe: PortableExecutable;

  public peConstants = PortableExecutableConstants;
}
