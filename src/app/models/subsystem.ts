import { HexSegment } from './segment';
import { HexHelper } from '../../shared/hex-helper';
import { SubsystemType } from './subsystem-type.enum';

export class Subsystem extends HexSegment {
  public readonly type: SubsystemType;

  constructor(
    startOffsetDec: number,
    endOffsetDec: number,
    sizeDec: number,
    hexValue: string
  ) {
    super(startOffsetDec, endOffsetDec, sizeDec, hexValue);

    const subsystem = HexHelper.getDecimal(hexValue);

    this.type = subsystem;
  }
}
