import { HexSegment } from './segment';
import { HexHelper } from '../../shared/hex-helper';
import { SubsystemType } from './subsystem-type.enum';

export class Subsystem extends HexSegment {
  public readonly type: SubsystemType;

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
