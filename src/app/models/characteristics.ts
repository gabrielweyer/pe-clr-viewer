import { HexSegment } from './segment';
import { HexHelper } from '../../shared/hex-helper';

export class Characteristics extends HexSegment {
  public readonly type: number;

  constructor(
    public readonly startOffsetDec: number,
    public readonly endOffsetDec: number,
    public readonly sizeDec: number,
    public readonly hexValue: string
  ) {
    super(startOffsetDec, endOffsetDec, sizeDec, hexValue);

    const subsystem = HexHelper.getDecimal(hexValue);

    this.type = subsystem;
  }
}
