/**
 * http://source.roslyn.codeplex.com/#System.Reflection.Metadata/System/Reflection/PortableExecutable/PEFileFlags.cs,a689a01c5e0f7594
 */
export enum CharacteristicsType {
  RelocsStripped = 1,
  ExecutableImage = 2,
  LineNumsStripped = 4,
  LocalSymsStripped = 8,
  AggressiveWSTrim = 16,
  LargeAddressAware = 32,
  ReservedForFutureUse = 64,
  BytesReversedLo = 128,
  Bit32Machine = 256,
  DebugStripped = 512,
  RemovableRunFromSwap = 1024,
  NetRunFromSwap = 2048,
  System = 4096,
  Dll = 8192,
  UpSystemOnly = 16384,
  BytesReversedHi = 32768
}
