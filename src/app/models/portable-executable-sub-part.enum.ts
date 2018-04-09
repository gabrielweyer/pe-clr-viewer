export enum PortableExecutableSubPart {
  None,
  SignatureOffset,
  MagicNumber,
  AddressOfEntryPoint,
  ImageBase,
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
