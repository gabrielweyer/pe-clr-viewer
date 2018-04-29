import { HexHelper } from './../../shared/hex-helper';
import { Component, OnInit, Input } from '@angular/core';
import { PortableExecutableConstants } from '../models/portable-executable-constants';
import { PortableExecutable } from '../models/portable-executable';
import { PortableExecutableReader } from '../../shared/portable-executable-reader.service';

@Component({
  selector: 'app-legend-text',
  templateUrl: './legend-text.component.html',
  styleUrls: ['./legend-text.component.scss']
})
export class LegendTextComponent {
  peConstants = PortableExecutableConstants;

  @Input() pe: PortableExecutable;

  public fileOffsetFromRvaDec = 0;
  public fileOffsetFromVaDec = 0;

  public onRva(inputRva: string): void {
    const fileOffsetDec = PortableExecutableReader.getFileOffsetInTextSectionFromRva(inputRva, this.pe);

    if (fileOffsetDec > 0) {
      this.fileOffsetFromRvaDec = fileOffsetDec;
    } else {
      this.fileOffsetFromRvaDec = 0;
    }
  }

  public onVa(inputVa: string): void {
    const fileOffsetDec = PortableExecutableReader.getFileOffsetInTextSectionFromVa(inputVa, this.pe);

    if (fileOffsetDec > 0) {
      this.fileOffsetFromVaDec = fileOffsetDec;
    } else {
      this.fileOffsetFromVaDec = 0;
    }
  }
}
