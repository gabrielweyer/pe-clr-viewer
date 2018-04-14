/**
 * http://source.roslyn.codeplex.com/#System.Reflection.Metadata/System/Reflection/PortableExecutable/PEFileFlags.cs,a689a01c5e0f7594
 */
export enum DllCharacteristicsType {
  ProcessInit = 1,
  ProcessTerm = 2,
  ThreadInit = 4,
  ThreadTerm = 8,
  HighEntropyVirtualAddressSpace = 32,
  DynamicBase = 64,
  ForceIntegrity = 128,
  NxCompatible = 256,
  NoIsolation = 512,
  NoSeh = 1024,
  NoBind = 2048,
  AppContainer = 4096,
  WdmDriver = 8192,
  ControlFlowGuard = 16384,
  TerminalServerAware = 32768
}
