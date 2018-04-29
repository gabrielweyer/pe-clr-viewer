import { Component, Input } from '@angular/core';
import { PortableExecutableReader } from '../../shared/portable-executable-reader.service';
import { PortableExecutable } from '../models/portable-executable';

@Component({
  selector: 'app-va-convertor',
  templateUrl: './va-convertor.component.html',
  styleUrls: ['./va-convertor.component.scss']
})
export class VaConvertorComponent {
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
