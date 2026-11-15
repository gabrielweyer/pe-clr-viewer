import { Component, Input } from '@angular/core';
import { Byte } from '../models/byte';
import { LeftPadPipe } from '../../shared/leftpad.pipe';
import { BytePipe } from '../../shared/byte.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-bytes-container',
  templateUrl: './bytes-container.component.html',
  styleUrl: './bytes-container.component.scss',
  imports: [NgClass, BytePipe, LeftPadPipe]
})
export class BytesContainerComponent {
  @Input() bytes: Byte[] = [];
  @Input() startOffsetDec = 0;

  shouldBlurTop(): boolean {
    return this.startOffsetDec !== 0;
  }
}
