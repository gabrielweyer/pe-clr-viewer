import { HexesGenerator } from './hexes-generator.service';
import { PortableExecutableConstants } from './../app/models/portable-executable-constants';
import { HexSegment, Segment, FileOffsetSegment, RvaSegment } from './../app/models/segment';
import { File } from './../app/models/file';
import { BytePipe } from './../shared/byte.pipe';
import { LeftPadPipe } from './../shared/leftpad.pipe';
import { PortableExecutablePart } from './../app/models/portable-executable-part.enum';
import { PortableExecutable } from './../app/models/portable-executable';
import { HexHelper } from '../shared/hex-helper';
import { DataDirectoryItem } from './../app/models/data-directory-item';
import { SectionItem } from './../app/models/section-item';
import { PortableExecutableSubPart } from './../app/models/portable-executable-sub-part.enum';
import { PartVisitor } from '../app/models/part-visitor';
import { SubPartVisitor } from '../app/models/sub-part-visitor';

export class PortableExecutableReader {
  private readonly file: File;

  constructor(bytes: Uint8Array) {
    this.file = new File(bytes);
  }

  read(): PortableExecutable {
    const pe = new PortableExecutable();

    this.setDosHeader(pe);
    this.setDosStub(pe);
    this.setSignature(pe);
    this.setCoffHeader(pe);
    this.setStandardFields(pe);
    this.setNtSpecificFields(pe);
    this.setDataDirectories(pe);
    this.setSectionHeaders(pe);
    this.setCliHeader(pe);
    this.setHexes(pe);

    return pe;
  }

  private setHexes(pe: PortableExecutable) {
    HexesGenerator.generate(this.file, pe);
  }

  private setDosHeader(pe: PortableExecutable) {
    pe.dosHeader = this.file.getSegment(
      PortableExecutableConstants.dosHeaderStartOffsetDec,
      PortableExecutableConstants.dosHeaderSizeDec
    );

    pe.signatureOffset = this.file.getFileOffsetSegment(
      PortableExecutableConstants.signatureOffsetStartOffsetDec,
      PortableExecutableConstants.signatureOffsetSizeDec
    );
  }

  private setDosStub(pe: PortableExecutable) {
    const endOffsetDec = HexHelper.getDecimal(pe.signatureOffset.fileOffset) - 1;
    const sizeDec = endOffsetDec - PortableExecutableConstants.dosStubStartOffsetDec;

    pe.dosStub = new Segment(PortableExecutableConstants.dosStubStartOffsetDec, endOffsetDec, sizeDec);
  }

  private setSignature(pe: PortableExecutable) {
    const startOffsetDec = HexHelper.getDecimal(pe.signatureOffset.fileOffset);

    pe.signature = this.file.getSegment(startOffsetDec, PortableExecutableConstants.signatureSizeDec);
  }

  private setCoffHeader(pe: PortableExecutable) {
    const coffHeaderStartOffsetDec = pe.signature.endOffsetDec + 1;

    pe.coffHeader = this.file.getSegment(coffHeaderStartOffsetDec, PortableExecutableConstants.coffHeaderSizeDec);
  }

  private setStandardFields(pe: PortableExecutable) {
    const standardFieldsStartOffsetDec = pe.coffHeader.endOffsetDec + 1;

    const magicNumberStartOffsetDec = standardFieldsStartOffsetDec;
    this.setMagicNumber(pe, magicNumberStartOffsetDec);

    pe.is64Bit = pe.magicNumber.hexValue === '020B';

    const standardFieldsSize = pe.is64Bit
      ? PortableExecutableConstants.standardFieldsPE32PlusSizeDec
      : PortableExecutableConstants.standardFieldsPE32SizeDec;

    pe.standardFields = this.file.getSegment(standardFieldsStartOffsetDec, standardFieldsSize);

    const addressOfEntryPointStartOffsetDec =
      standardFieldsStartOffsetDec + PortableExecutableConstants.addressOfEntryPointSubOffsetDec;
    this.setAddressOfEntryPoint(pe, addressOfEntryPointStartOffsetDec);
  }

  private setMagicNumber(pe: PortableExecutable, startOffsetDec: number) {
    pe.magicNumber = this.file.getHexSegment(startOffsetDec, PortableExecutableConstants.magicNumberSizeDec);
  }

  private setAddressOfEntryPoint(pe: PortableExecutable, startOffsetDec: number) {
    pe.addressOfEntryPoint = this.file.getRvaSegment(
      startOffsetDec,
      PortableExecutableConstants.addressOfEntryPointSizeDec
    );
  }

  private setNtSpecificFields(pe: PortableExecutable) {
    const startOffsetDec = pe.standardFields.endOffsetDec + 1;
    const sizeDec = pe.is64Bit
      ? PortableExecutableConstants.ntSpecificFieldsPE32PlusSizeDec
      : PortableExecutableConstants.ntSpecificFieldsPE32SizeDec;

    pe.ntSpecificFields = this.file.getSegment(startOffsetDec, sizeDec);
  }

  private setDataDirectories(pe: PortableExecutable) {
    const dataDirectoriesStartOffsetDec = pe.ntSpecificFields.endOffsetDec + 1;
    pe.dataDirectories = this.file.getSegment(
      dataDirectoriesStartOffsetDec,
      PortableExecutableConstants.dataDirectoriesSizeDec
    );

    pe.importTableDirectory = this.getDirectoryItem(
      dataDirectoriesStartOffsetDec,
      PortableExecutableConstants.importTableDirectorySubOffsetDec
    );

    pe.importAddressTableDirectory = this.getDirectoryItem(
      dataDirectoriesStartOffsetDec,
      PortableExecutableConstants.importAddressTableDirectorySubOffsetDec
    );

    pe.cliHeaderDirectory = this.getDirectoryItem(
      dataDirectoriesStartOffsetDec,
      PortableExecutableConstants.cliHeaderDirectorySubOffsetDec
    );

    pe.isManaged = pe.cliHeaderDirectory.size.hexValue !== '00000000';
  }

  private getDirectoryItem(dataDirectoriesStartOffsetDec: number, subOffsetDec: number): DataDirectoryItem {
    const rvaStartOffsetDec = dataDirectoriesStartOffsetDec + subOffsetDec;
    const rva = this.file.getRvaSegment(rvaStartOffsetDec, PortableExecutableConstants.rvaSize);

    const sizeStartOffsetDec = rva.endOffsetDec + 1;
    const size = this.file.getHexSegment(sizeStartOffsetDec, PortableExecutableConstants.sizeSize);

    return new DataDirectoryItem(rva, size);
  }

  private setSectionHeaders(pe: PortableExecutable) {
    const textSectionHeaderStartOffsetDec = pe.dataDirectories.endOffsetDec + 1;
    pe.textSectionHeader = this.file.getSegment(
      textSectionHeaderStartOffsetDec,
      PortableExecutableConstants.sectionHeaderSize
    );
    pe.textSectionItem = this.getSectionItem(textSectionHeaderStartOffsetDec);

    const rsrcSectionHeaderStartOffsetDec = pe.textSectionHeader.endOffsetDec + 1;
    pe.rsrcSectionHeader = this.file.getSegment(
      rsrcSectionHeaderStartOffsetDec,
      PortableExecutableConstants.sectionHeaderSize
    );
    pe.rsrcSectionItem = this.getSectionItem(rsrcSectionHeaderStartOffsetDec);

    const relocSectionHeaderStartOffsetDec = pe.rsrcSectionHeader.endOffsetDec + 1;
    pe.relocSectionHeader = this.file.getSegment(
      relocSectionHeaderStartOffsetDec,
      PortableExecutableConstants.sectionHeaderSize
    );
    pe.relocSectionItem = this.getSectionItem(relocSectionHeaderStartOffsetDec);
  }

  private getSectionItem(startOffsetDec: number): SectionItem {
    const baseRva = this.file.getRvaSegment(
      startOffsetDec + PortableExecutableConstants.baseRvaSubOffsetDec,
      PortableExecutableConstants.rvaSize
    );

    const fileOffset = this.file.getFileOffsetSegment(
      startOffsetDec + PortableExecutableConstants.fileOffsetSubOffsetDec,
      PortableExecutableConstants.sizeSize
    );

    return new SectionItem(baseRva, fileOffset);
  }

  private setCliHeader(pe: PortableExecutable) {
    if (!pe.isManaged) { return; }

    const cliHeaderStartOffsetDec =
      HexHelper.getDecimal(pe.textSectionItem.fileOffset.fileOffset) +
      HexHelper.getDecimal(pe.importAddressTableDirectory.size.hexValue);

    pe.cliHeaderSize = HexHelper.getDecimal(pe.cliHeaderDirectory.size.hexValue);

    pe.cliHeader = this.file.getSegment(cliHeaderStartOffsetDec, pe.cliHeaderSize);
  }
}