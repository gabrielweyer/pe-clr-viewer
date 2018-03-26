export enum PortableExecutablePart {
  CantBeBothered,
  DosHeader,
  DosStub,
  Signature,
  CoffHeader,
  StandardFields,
  NtSpecificFields,
  DataDirectories,
  TextSectionHeader,
  RsrcSectionHeader,
  RelocSectionHeader,
  CliHeader
}
