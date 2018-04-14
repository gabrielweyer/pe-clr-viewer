import { Component, Input } from '@angular/core';
import { Byte } from '../models/byte';

@Component({
  selector: 'app-bytes-container',
  templateUrl: './bytes-container.component.html',
  styleUrls: ['./bytes-container.component.scss']
})
export class BytesContainerComponent {
  @Input() bytes: Byte[];

  @Input() startOffsetDec = 0;
}
