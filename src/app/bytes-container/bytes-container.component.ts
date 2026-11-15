import { Component, input } from '@angular/core';
import { Byte } from '../models/byte';
import { LeftPadPipe } from '../../shared/leftpad.pipe';
import { BytePipe } from '../../shared/byte.pipe';


@Component({
  selector: 'app-bytes-container',
  templateUrl: './bytes-container.component.html',
  styleUrl: './bytes-container.component.scss',
  imports: [BytePipe, LeftPadPipe]
})
export class BytesContainerComponent {
  readonly bytes = input<Byte[]>([]);
  readonly startOffsetDec = input(0);

  shouldBlurTop(): boolean {
    return this.startOffsetDec() !== 0;
  }
}
