export enum PortableExecutableSubPart {
  None,
  SignatureOffset,
  MagicNumber,
  AddressOfEntryPoint,
  ImageBase,
  Subsystem,
  ImportTableDirectorySize,
  ImportTableDirectoryRva,
  ImportAddressTableDirectorySize,
  ImportAddressTableDirectoryRva,
  CliHeaderDirectorySize,
  CliHeaderDirectoryRva,
  TextBaseRva,
  TextFileOffset,
  RsrcBaseRva,
  RsrcFileOffset,
  RelocBaseRva,
  RelocFileOffset,
  CliFlags
}
