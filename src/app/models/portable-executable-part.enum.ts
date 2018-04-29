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
  ImportAddressTable,
  CliHeader,
  CliMetadataHeader,
  ImportTable,
  EntryPoint
}
