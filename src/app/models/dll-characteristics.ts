import { HexSegment } from './segment';
import { HexHelper } from '../../shared/hex-helper';

export class DllCharacteristics extends HexSegment {
  public readonly type: number;

  constructor(
    startOffsetDec: number,
    endOffsetDec: number,
    sizeDec: number,
    hexValue: string
  ) {
    super(startOffsetDec, endOffsetDec, sizeDec, hexValue);

    const type = HexHelper.getDecimal(hexValue);

    this.type = type;
  }
}
