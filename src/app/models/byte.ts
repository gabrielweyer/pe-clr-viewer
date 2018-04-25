import { CliFlags } from './cli-flags';
import { PortableExecutablePart } from './portable-executable-part.enum';
import { PortableExecutableSubPart } from './portable-executable-sub-part.enum';

export class Byte {
  constructor(
    public readonly value: string,
    public readonly part: PortableExecutablePart,
    public readonly subPart: PortableExecutableSubPart
  ) {}

  public isDosHeader(): boolean {
    return this.part === PortableExecutablePart.DosHeader;
  }

  public isDosStub(): boolean {
    return this.part === PortableExecutablePart.DosStub;
  }

  public isSignatureOffset(): boolean {
    return this.subPart === PortableExecutableSubPart.SignatureOffset;
  }

  public isSignature(): boolean {
    return this.part === PortableExecutablePart.Signature;
  }

  public isCoffHeader(): boolean {
    return this.part === PortableExecutablePart.CoffHeader;
  }

  public isCharacteristics(): boolean {
    return this.subPart === PortableExecutableSubPart.Characteristics;
  }

  public isStandardFields(): boolean {
    return this.part === PortableExecutablePart.StandardFields;
  }

  public isMagicNumber(): boolean {
    return this.subPart === PortableExecutableSubPart.MagicNumber;
  }

  public isAddressOfEntryPoint(): boolean {
    return this.subPart === PortableExecutableSubPart.AddressOfEntryPoint;
  }

  public isNtSpecificFields(): boolean {
    return this.part === PortableExecutablePart.NtSpecificFields;
  }

  public isImageBase(): boolean {
    return this.subPart === PortableExecutableSubPart.ImageBase;
  }

  public isSubsystem(): boolean {
    return this.subPart === PortableExecutableSubPart.Subsystem;
  }

  public isDllCharacteristics(): boolean {
    return this.subPart === PortableExecutableSubPart.DllCharacteristics;
  }

  public isDataDirectories(): boolean {
    return this.part === PortableExecutablePart.DataDirectories;
  }

  public isImportTableDirectorySize(): boolean {
    return this.subPart === PortableExecutableSubPart.ImportTableDirectorySize;
  }

  public isImportTableDirectoryRva(): boolean {
    return this.subPart === PortableExecutableSubPart.ImportTableDirectoryRva;
  }

  public isImportAddressTableDirectorySize(): boolean {
    return this.subPart === PortableExecutableSubPart.ImportAddressTableDirectorySize;
  }

  public isImportAddressTableDirectoryRva(): boolean {
    return this.subPart === PortableExecutableSubPart.ImportAddressTableDirectoryRva;
  }

  public isCliHeaderDirectorySize(): boolean {
    return this.subPart === PortableExecutableSubPart.CliHeaderDirectorySize;
  }

  public isCliHeaderDirectoryRva(): boolean {
    return this.subPart === PortableExecutableSubPart.CliHeaderDirectoryRva;
  }

  public isTextSectionHeader(): boolean {
    return this.part === PortableExecutablePart.TextSectionHeader;
  }

  public isTextBaseRva(): boolean {
    return this.subPart === PortableExecutableSubPart.TextBaseRva;
  }

  public isTextFileOffset(): boolean {
    return this.subPart === PortableExecutableSubPart.TextFileOffset;
  }

  public isRsrcSectionHeader(): boolean {
    return this.part === PortableExecutablePart.RsrcSectionHeader;
  }

  public isRsrcBaseRva(): boolean {
    return this.subPart === PortableExecutableSubPart.RsrcBaseRva;
  }

  public isRsrcFileOffset(): boolean {
    return this.subPart === PortableExecutableSubPart.RsrcFileOffset;
  }

  public isRelocSectionHeader(): boolean {
    return this.part === PortableExecutablePart.RelocSectionHeader;
  }

  public isRelocBaseRva(): boolean {
    return this.subPart === PortableExecutableSubPart.RelocBaseRva;
  }

  public isRelocFileOffset(): boolean {
    return this.subPart === PortableExecutableSubPart.RelocFileOffset;
  }

  public isImportAddressTable(): boolean {
    return this.part === PortableExecutablePart.ImportAddressTable;
  }

  public isCliHeader(): boolean {
    return this.part === PortableExecutablePart.CliHeader;
  }

  public isCliMetadataHeaderDirectoryRva(): boolean {
    return this.subPart === PortableExecutableSubPart.CliMetadataHeaderDirectoryRva;
  }

  public isCliMetadataHeaderDirectorySize(): boolean {
    return this.subPart === PortableExecutableSubPart.CliMetadataHeaderDirectorySize;
  }

  public isCliFlags(): boolean {
    return this.subPart === PortableExecutableSubPart.CliFlags;
  }

  public isCliMetadataHeader(): boolean {
    return this.part === PortableExecutablePart.CliMetadataHeader;
  }

  public isClrVersionSize(): boolean {
    return this.subPart === PortableExecutableSubPart.ClrVersionSize;
  }

  public isClrVersion(): boolean {
    return this.subPart === PortableExecutableSubPart.ClrVersion;
  }

  public isImportTable(): boolean {
    return this.part === PortableExecutablePart.ImportTable;
  }
}
