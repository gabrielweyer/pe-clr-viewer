import { HexHelper } from './../../shared/hex-helper';
import { HexSegment } from './segment';

/**
 * http://source.roslyn.codeplex.com/#System.Reflection.Metadata/System/Reflection/PortableExecutable/CorFlags.cs,1b8345c412a0a995
 */
enum CorFlags {
  ILOnly = 1,
  Requires32Bit = 2,
  ILLibrary = 4,
  StrongNameSigned = 8,
  NativeEntryPoint = 16,
  TrackDebugData = 65536,
  Prefers32Bit = 131072
}

/** Based on http://www.ntcore.com/files/dotnetformat.htm */
export class CliFlags extends HexSegment {
  public readonly ILOnly: boolean;
  public readonly Requires32Bit: boolean;
  public readonly ILLibrary: boolean;
  public readonly StrongNameSigned: boolean;
  public readonly NativeEntryPoint: boolean;
  public readonly TrackDebugData: boolean;
  public readonly Prefers32Bit: boolean;

  constructor(
    startOffsetDec: number,
    endOffsetDec: number,
    sizeDec: number,
    hexValue: string
  ) {
    super(startOffsetDec, endOffsetDec, sizeDec, hexValue);

    const flags = HexHelper.getDecimal(hexValue);

    /* eslint-disable no-bitwise */
    this.ILOnly = (flags & CorFlags.ILOnly) === CorFlags.ILOnly;
    this.Requires32Bit = (flags & CorFlags.Requires32Bit) === CorFlags.Requires32Bit;
    this.ILLibrary = (flags & CorFlags.ILLibrary) === CorFlags.ILLibrary;
    this.StrongNameSigned = (flags & CorFlags.StrongNameSigned) === CorFlags.StrongNameSigned;
    this.NativeEntryPoint = (flags & CorFlags.NativeEntryPoint) === CorFlags.NativeEntryPoint;
    this.TrackDebugData = (flags & CorFlags.TrackDebugData) === CorFlags.TrackDebugData;
    this.Prefers32Bit = (flags & CorFlags.Prefers32Bit) === CorFlags.Prefers32Bit;
    /* eslint-enable no-bitwise */
  }
}
