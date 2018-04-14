import { HexSegment } from './segment';
import { HexHelper } from '../../shared/hex-helper';

export class DllCharacteristics extends HexSegment {
  public readonly type: number;

  constructor(
    public readonly startOffsetDec: number,
    public readonly endOffsetDec: number,
    public readonly sizeDec: number,
    public readonly hexValue: string
  ) {
    super(startOffsetDec, endOffsetDec, sizeDec, hexValue);

    const type = HexHelper.getDecimal(hexValue);

    this.type = type;
  }
}
