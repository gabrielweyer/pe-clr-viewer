import { Component, computed, input } from '@angular/core';
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

  readonly columns = Array.from({ length: 16 }, (_, column) => column.toString(16).toUpperCase().padStart(2, '0'));

  readonly shouldBlurTop = computed(() => this.startOffsetDec() !== 0);
}
