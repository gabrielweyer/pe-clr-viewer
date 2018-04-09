import { HexHelper } from './../../shared/hex-helper';
import { HexSegment } from './segment';

enum FlagsType {
  IlOnly = 1,
  ThirtyTwoBitRequired = 2,
  StrongNamed = 8
}

/** Based on http://www.ntcore.com/files/dotnetformat.htm */
export class CliFlags extends HexSegment {
  public readonly isIlOnly: boolean;
  public readonly is32BitRequired: boolean;
  public readonly isStrongNamed: boolean;

  constructor(
    public readonly startOffsetDec: number,
    public readonly endOffsetDec: number,
    public readonly sizeDec: number,
    public readonly hexValue: string
  ) {
    super(startOffsetDec, endOffsetDec, sizeDec, hexValue);

    const flags = HexHelper.getDecimal(hexValue);

    this.isIlOnly = (flags & FlagsType.IlOnly) === FlagsType.IlOnly;
    this.is32BitRequired = (flags & FlagsType.ThirtyTwoBitRequired) === FlagsType.ThirtyTwoBitRequired;
    this.isStrongNamed = (flags & FlagsType.StrongNamed) === FlagsType.StrongNamed;
  }
}
