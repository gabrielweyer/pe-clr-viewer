import { Component, Input } from '@angular/core';
import { PortableExecutableReader } from '../../shared/portable-executable-reader.service';
import { PortableExecutable } from '../models/portable-executable';
import { HexPipe } from '../../shared/hex.pipe';
import { LeftPadPipe } from '../../shared/leftpad.pipe';
import { BytePipe } from '../../shared/byte.pipe';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-va-convertor',
  templateUrl: './va-convertor.component.html',
  styleUrl: './va-convertor.component.scss',
  standalone: true,
  imports: [NgIf, BytePipe, LeftPadPipe, HexPipe]
})
export class VaConvertorComponent {
  @Input() pe!: PortableExecutable;

  public fileOffsetFromRvaDec = 0;
  public fileOffsetFromVaDec = 0;

  public onRva(inputRva: Event): void {
    const fileOffsetDec = PortableExecutableReader.getFileOffsetInTextSectionFromRva((inputRva.target as HTMLInputElement).value, this.pe);

    if (fileOffsetDec > 0) {
      this.fileOffsetFromRvaDec = fileOffsetDec;
    } else {
      this.fileOffsetFromRvaDec = 0;
    }
  }

  public onVa(inputVa: Event): void {
    const fileOffsetDec = PortableExecutableReader.getFileOffsetInTextSectionFromVa((inputVa.target as HTMLInputElement).value, this.pe);

    if (fileOffsetDec > 0) {
      this.fileOffsetFromVaDec = fileOffsetDec;
    } else {
      this.fileOffsetFromVaDec = 0;
    }
  }
}
