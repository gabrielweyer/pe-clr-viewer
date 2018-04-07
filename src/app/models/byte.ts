import { PortableExecutablePart } from './portable-executable-part.enum';
import { PortableExecutableSubPart } from './portable-executable-sub-part.enum';

export class Byte {
  constructor(public value: string, public part: PortableExecutablePart, public subPart: PortableExecutableSubPart) {}

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

  public isStandardFields(): boolean {
    return this.part === PortableExecutablePart.StandardFields;
  }

  public isMagicNumber(): boolean {
    return this.subPart === PortableExecutableSubPart.MagicNumber;
  }

  public isAddressOfEntryPoint(): boolean {
    return this.subPart === PortableExecutableSubPart.AddressOfEntryPoint;
  }

  public isNtSpecificFieldsHeaders(): boolean {
    return this.part === PortableExecutablePart.NtSpecificFields;
  }

  public isImageBase(): boolean {
    return this.subPart === PortableExecutableSubPart.ImageBase;
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

  public isCliHeader(): boolean {
    return this.part === PortableExecutablePart.CliHeader;
  }
}
