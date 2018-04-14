export enum PortableExecutablePart {
  None,
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
  CliHeader,
  CliMetadataHeader
}
