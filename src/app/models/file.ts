import { HexSegment, Segment, FileOffsetSegment, RvaSegment, AsciiSegment } from './segment';
import { LeftPadPipe } from '../../shared/leftpad.pipe';
import { BytePipe } from '../../shared/byte.pipe';

export class File {
  private static readonly leftPadPipe = new LeftPadPipe();
  private static readonly bytePipe = new BytePipe();

  constructor(public readonly bytes: Uint8Array) {}

  public static getEndOffsetDec(startOffsetDec: number, size: number): number {
    return startOffsetDec + size - 1;
  }

  public getHexSegment(startOffsetDec: number, sizeDec: number): HexSegment {
    const endOffsetDec = File.getEndOffsetDec(startOffsetDec, sizeDec);
    const hexValue = this.getHexValue(startOffsetDec, endOffsetDec);

    return new HexSegment(startOffsetDec, endOffsetDec, sizeDec, hexValue);
  }

  public getFileOffsetSegment(startOffsetDec: number, sizeDec: number): FileOffsetSegment {
    const endOffsetDec = File.getEndOffsetDec(startOffsetDec, sizeDec);
    const hexValue = this.getHexValue(startOffsetDec, endOffsetDec);

    return new FileOffsetSegment(startOffsetDec, endOffsetDec, sizeDec, hexValue);
  }

  public getRvaSegment(startOffsetDec: number, sizeDec: number): RvaSegment {
    const endOffsetDec = File.getEndOffsetDec(startOffsetDec, sizeDec);
    const hexValue = this.getHexValue(startOffsetDec, endOffsetDec);

    return new RvaSegment(startOffsetDec, endOffsetDec, sizeDec, hexValue);
  }

  public getAsciiSegment(startOffsetDec: number, sizeDec: number): AsciiSegment {
    const endOffsetDec = File.getEndOffsetDec(startOffsetDec, sizeDec);
    const asciiValue = this.getAsciiValue(startOffsetDec, endOffsetDec);

    return new AsciiSegment(startOffsetDec, endOffsetDec, sizeDec, asciiValue);
  }

  public getSegment(startOffsetDec: number, sizeDec: number): Segment {
    const endOffsetDec = File.getEndOffsetDec(startOffsetDec, sizeDec);
    return new Segment(startOffsetDec, endOffsetDec, sizeDec);
  }

  private getHexValue(startOffsetDec: number, endOffsetDec: number): string {
    return this.bytes
      .filter((v, i) => i >= startOffsetDec && i <= endOffsetDec)
      .reduce((previous, current) => File.leftPadPipe.transform(File.bytePipe.transform(current), 2) + previous, '');
  }

  private getAsciiValue(startOffsetDec: number, endOffsetDec: number): string {
    return String.fromCharCode
      .apply(null, this.bytes.filter((v, i) => i >= startOffsetDec && i <= endOffsetDec && v !== 0));
  }
}
