import { HexesGenerator } from './hexes-generator.service';
import { PortableExecutableConstants } from './../app/models/portable-executable-constants';
import { Segment, FileOffsetSegment, AsciiSegment, HexSegment, RvaSegment } from './../app/models/segment';
import { File } from './../app/models/file';
import { PortableExecutable } from './../app/models/portable-executable';
import { HexHelper } from '../shared/hex-helper';
import { DataDirectoryItem } from './../app/models/data-directory-item';
import { SectionItem } from './../app/models/section-item';
import { CliFlags } from '../app/models/cli-flags';
import { Subsystem } from '../app/models/subsystem';
import { Characteristics } from '../app/models/characteristics';
import { DllCharacteristics } from '../app/models/dll-characteristics';
import { StringHelper } from './string-helper';
import { EntryPoint } from '../app/models/entry-point';

class CoffHeader {
  public coffHeader: Segment;
  public characteristics: Characteristics;

  constructor(coffHeader: Segment, characteristics: Characteristics) {
    this.coffHeader = coffHeader;
    this.characteristics = characteristics;
  }
}

class StandardFields {
  public magicNumber: HexSegment;
  public is64Bit: boolean;
  public standardFields: Segment;
  public addressOfEntryPoint: RvaSegment;

  constructor(magicNumber: HexSegment, is64Bit: boolean, standardFields: Segment, addressOfEntryPoint: RvaSegment) {
    this.magicNumber = magicNumber;
    this.is64Bit = is64Bit;
    this.standardFields = standardFields;
    this.addressOfEntryPoint = addressOfEntryPoint;
  }
}

class NtSpecificFields {
  public ntSpecificFields: Segment;
  public imageBase: HexSegment;
  public subsystem: Subsystem;
  public dllCharacteristics: DllCharacteristics;

  constructor(ntSpecificFields: Segment, imageBase: HexSegment, subsystem: Subsystem, dllCharacteristics: DllCharacteristics) {
    this.ntSpecificFields = ntSpecificFields;
    this.imageBase = imageBase;
    this.subsystem = subsystem;
    this.dllCharacteristics = dllCharacteristics;
  }
}

class DataDirectories {
  public dataDirectories: Segment;
  public importTableDirectory: DataDirectoryItem;
  public importAddressTableDirectory: DataDirectoryItem;
  public cliHeaderDirectory: DataDirectoryItem;
  public isManaged: boolean;

  constructor(
    dataDirectories: Segment,
    importTableDirectory: DataDirectoryItem,
    importAddressTableDirectory: DataDirectoryItem,
    cliHeaderDirectory: DataDirectoryItem,
    isManaged: boolean
  ) {
    this.dataDirectories = dataDirectories;
    this.importTableDirectory = importTableDirectory;
    this.importAddressTableDirectory = importAddressTableDirectory;
    this.cliHeaderDirectory = cliHeaderDirectory;
    this.isManaged = isManaged;
  }
}

class SectionHeaders {
  public textSectionHeader: Segment;
  public textSectionItem: SectionItem;
  public rsrcSectionHeader: Segment;
  public rsrcSectionItem: SectionItem;
  public relocSectionHeader: Segment;
  public relocSectionItem: SectionItem;

  constructor(
    textSectionHeader: Segment,
    textSectionItem: SectionItem,
    rsrcSectionHeader: Segment,
    rsrcSectionItem: SectionItem,
    relocSectionHeader: Segment,
    relocSectionItem: SectionItem
  ) {
    this.textSectionHeader = textSectionHeader;
    this.textSectionItem = textSectionItem;
    this.rsrcSectionHeader = rsrcSectionHeader;
    this.rsrcSectionItem = rsrcSectionItem;
    this.relocSectionHeader = relocSectionHeader;
    this.relocSectionItem = relocSectionItem;
  }
}

export class PortableExecutableReader {
  private readonly file: File;

  constructor(bytes: Uint8Array) {
    this.file = new File(bytes);
  }

  public static getFileOffsetInTextSectionFromRva(rva: string, pe: PortableExecutable): number {
    const rvaDec = HexHelper.getDecimal(rva);
    return PortableExecutableReader.getFileOffsetInTextSectionFromDecRva(rvaDec, pe);
  }

  public static getFileOffsetInTextSectionFromVa(va: string, pe: PortableExecutable): number {
    const rva = HexHelper.getDecimal(va) - HexHelper.getDecimal(pe.imageBase.hexValue);
    return PortableExecutableReader.getFileOffsetInTextSectionFromDecRva(rva, pe);
  }

  private static getFileOffsetInTextSectionFromDecRva(rva: number, pe: PortableExecutable): number {
    return rva -
      HexHelper.getDecimal(pe.textSectionItem.baseRva.rva) +
      HexHelper.getDecimal(pe.textSectionItem.fileOffset.fileOffset);
  }

  read(): PortableExecutable {
    if (this.file.bytes[0] !== 77 || this.file.bytes[1] !== 90) {
      throw new Error('This file is not a portable executable.');
    }

    const dosHeader = this.getDosHeader();
    const signatureOffset = this.getSignatureOffset();
    const dosStub = this.getDosStub(signatureOffset);
    const signature = this.getSignature(signatureOffset);
    const coffHeader = this.getCoffHeader(signature);
    const standardFields = this.getStandardFields(coffHeader.coffHeader);
    const ntSpecificFields = this.getNtSpecificFields(standardFields);
    const dataDirectories = this.getDataDirectories(ntSpecificFields.ntSpecificFields);
    const sectionHeaders = this.getSectionHeaders(dataDirectories.dataDirectories);

    const pe = new PortableExecutable(
      dosHeader,
      signatureOffset,
      dosStub,
      signature,
      coffHeader.coffHeader,
      coffHeader.characteristics,
      standardFields.standardFields,
      standardFields.magicNumber,
      standardFields.is64Bit,
      standardFields.addressOfEntryPoint,
      ntSpecificFields.ntSpecificFields,
      ntSpecificFields.imageBase,
      ntSpecificFields.subsystem,
      ntSpecificFields.dllCharacteristics,
      dataDirectories.dataDirectories,
      dataDirectories.importTableDirectory,
      dataDirectories.importAddressTableDirectory,
      dataDirectories.cliHeaderDirectory,
      dataDirectories.isManaged,
      sectionHeaders.textSectionHeader,
      sectionHeaders.textSectionItem,
      sectionHeaders.rsrcSectionHeader,
      sectionHeaders.rsrcSectionItem,
      sectionHeaders.relocSectionHeader,
      sectionHeaders.relocSectionItem
    );

    this.setImportAddressTable(pe);
    this.setCliHeader(pe);
    this.setCliMetadataHeader(pe);
    this.setImportTable(pe);
    this.setEntryPoint(pe);

    this.setHexes(pe);

    return pe;
  }

  private setHexes(pe: PortableExecutable) {
    HexesGenerator.generate(this.file, pe);
  }

  private getDosHeader(): Segment {
    return this.file.getSegment(
      PortableExecutableConstants.dosHeaderStartOffsetDec,
      PortableExecutableConstants.dosHeaderSizeDec
    );
  }

  private getSignatureOffset(): FileOffsetSegment {
    return this.file.getFileOffsetSegment(
      PortableExecutableConstants.signatureOffsetStartOffsetDec,
      PortableExecutableConstants.signatureOffsetSizeDec
    );
  }

  private getDosStub(signatureOffset: FileOffsetSegment): Segment {
    const endOffsetDec = HexHelper.getDecimal(signatureOffset.fileOffset) - 1;
    const sizeDec = endOffsetDec - PortableExecutableConstants.dosStubStartOffsetDec;

    return new Segment(PortableExecutableConstants.dosStubStartOffsetDec, endOffsetDec, sizeDec);
  }

  private getSignature(signatureOffset: FileOffsetSegment): Segment {
    const startOffsetDec = HexHelper.getDecimal(signatureOffset.fileOffset);

    return this.file.getSegment(startOffsetDec, PortableExecutableConstants.signatureSizeDec);
  }

  private getCoffHeader(signature: Segment): CoffHeader {
    const coffHeaderStartOffsetDec = signature.endOffsetDec + 1;

    const coffHeader = this.file.getSegment(coffHeaderStartOffsetDec, PortableExecutableConstants.coffHeaderSizeDec);

    const characteristicsStartOffsetDec =
      coffHeader.startOffsetDec + PortableExecutableConstants.characteristicsSubOffsetDec;
    const characteristicsSegment = this.file.getHexSegment(
      characteristicsStartOffsetDec,
      PortableExecutableConstants.characteristicsSizeDec
    );
    const characteristics = new Characteristics(
      characteristicsSegment.startOffsetDec,
      characteristicsSegment.endOffsetDec,
      characteristicsSegment.sizeDec,
      characteristicsSegment.hexValue
    );

    return new CoffHeader(coffHeader, characteristics);
  }

  private getStandardFields(coffHeader: Segment): StandardFields {
    const standardFieldsStartOffsetDec = coffHeader.endOffsetDec + 1;

    const magicNumberStartOffsetDec = standardFieldsStartOffsetDec;
    const magicNumber = this.file.getHexSegment(magicNumberStartOffsetDec, PortableExecutableConstants.magicNumberSizeDec);

    const is64Bit = magicNumber.hexValue === '020B';

    const standardFieldsSize = is64Bit
      ? PortableExecutableConstants.standardFieldsPE32PlusSizeDec
      : PortableExecutableConstants.standardFieldsPE32SizeDec;

    const standardFields = this.file.getSegment(standardFieldsStartOffsetDec, standardFieldsSize);

    const addressOfEntryPointStartOffsetDec =
      standardFieldsStartOffsetDec + PortableExecutableConstants.addressOfEntryPointSubOffsetDec;
    const addressOfEntryPoint = this.file.getRvaSegment(
      addressOfEntryPointStartOffsetDec,
      PortableExecutableConstants.addressOfEntryPointSizeDec
    );

    return new StandardFields(magicNumber, is64Bit, standardFields, addressOfEntryPoint);
  }

  private getNtSpecificFields(standardFields: StandardFields): NtSpecificFields {
    const startOffsetDec = standardFields.standardFields.endOffsetDec + 1;
    const sizeDec = standardFields.is64Bit
      ? PortableExecutableConstants.ntSpecificFieldsPE32PlusSizeDec
      : PortableExecutableConstants.ntSpecificFieldsPE32SizeDec;

    const ntSpecificFields = this.file.getSegment(startOffsetDec, sizeDec);
    const imageBase = this.getImageBase(standardFields.is64Bit, startOffsetDec);

    const subsystemSubOffsetDec = standardFields.is64Bit
      ? PortableExecutableConstants.subsystemPE32PlusSubOffsetDec
      : PortableExecutableConstants.subsystemPE32SubOffsetDec;
    const subsystemStartOffsetDec = startOffsetDec + subsystemSubOffsetDec;
    const subsystem = this.setSubsystem(subsystemStartOffsetDec);

    const dllCharacteristicsSubOffsetDec = standardFields.is64Bit
      ? PortableExecutableConstants.dllCharacteristicsPE32PlusSubOffsetDec
      : PortableExecutableConstants.dllCharacteristicsPE32SubOffsetDec;
    const dllCharacteristicsStartOffsetDec = startOffsetDec + dllCharacteristicsSubOffsetDec;
    const dllCharacteristics = this.getDllCharacteristics(dllCharacteristicsStartOffsetDec);

    return new NtSpecificFields(ntSpecificFields, imageBase, subsystem, dllCharacteristics);
  }

  private getImageBase(is64Bit: boolean, startOffsetDec: number) {
    const sizeDec = is64Bit
      ? PortableExecutableConstants.imageBasePE32PlusSizeDec
      : PortableExecutableConstants.imageBasePE32SizeDec;

    return this.file.getHexSegment(startOffsetDec, sizeDec);
  }

  private setSubsystem(startOffsetDec: number): Subsystem {
    const sizeDec = PortableExecutableConstants.subsystemSizeDec;

    const subsystem = this.file.getHexSegment(startOffsetDec, sizeDec);
    return new Subsystem(
      subsystem.startOffsetDec,
      subsystem.endOffsetDec,
      subsystem.sizeDec,
      subsystem.hexValue
    );
  }

  private getDllCharacteristics(startOffsetDec: number): DllCharacteristics {
    const sizeDec = PortableExecutableConstants.dllCharacteristicsSizeDec;

    const dllCharacteristics = this.file.getHexSegment(startOffsetDec, sizeDec);
    return new DllCharacteristics(
      dllCharacteristics.startOffsetDec,
      dllCharacteristics.endOffsetDec,
      dllCharacteristics.sizeDec,
      dllCharacteristics.hexValue
    );
  }

  private getDataDirectories(ntSpecificFields: Segment): DataDirectories {
    const dataDirectoriesStartOffsetDec = ntSpecificFields.endOffsetDec + 1;
    const dataDirectories = this.file.getSegment(
      dataDirectoriesStartOffsetDec,
      PortableExecutableConstants.dataDirectoriesSizeDec
    );

    const importTableDirectory = this.getDirectoryItem(
      dataDirectoriesStartOffsetDec,
      PortableExecutableConstants.importTableDirectorySubOffsetDec
    );

    const importAddressTableDirectory = this.getDirectoryItem(
      dataDirectoriesStartOffsetDec,
      PortableExecutableConstants.importAddressTableDirectorySubOffsetDec
    );

    const cliHeaderDirectory = this.getDirectoryItem(
      dataDirectoriesStartOffsetDec,
      PortableExecutableConstants.cliHeaderDirectorySubOffsetDec
    );

    const isManaged = cliHeaderDirectory.size.hexValue !== '00000000';

    return new DataDirectories(dataDirectories, importTableDirectory, importAddressTableDirectory, cliHeaderDirectory, isManaged);
  }

  private getDirectoryItem(dataDirectoriesStartOffsetDec: number, subOffsetDec: number): DataDirectoryItem {
    const rvaStartOffsetDec = dataDirectoriesStartOffsetDec + subOffsetDec;
    const rva = this.file.getRvaSegment(rvaStartOffsetDec, PortableExecutableConstants.rvaSize);

    const sizeStartOffsetDec = rva.endOffsetDec + 1;
    const size = this.file.getHexSegment(sizeStartOffsetDec, PortableExecutableConstants.sizeSize);

    return new DataDirectoryItem(rva, size);
  }

  private getSectionHeaders(dataDirectories: Segment): SectionHeaders {
    const textSectionHeaderStartOffsetDec = dataDirectories.endOffsetDec + 1;
    const textSectionHeader = this.file.getSegment(
      textSectionHeaderStartOffsetDec,
      PortableExecutableConstants.sectionHeaderSize
    );
    const textSectionItem = this.getSectionItem(textSectionHeaderStartOffsetDec);

    const rsrcSectionHeaderStartOffsetDec = textSectionHeader.endOffsetDec + 1;
    const rsrcSectionHeader = this.file.getSegment(
      rsrcSectionHeaderStartOffsetDec,
      PortableExecutableConstants.sectionHeaderSize
    );
    const rsrcSectionItem = this.getSectionItem(rsrcSectionHeaderStartOffsetDec);

    const relocSectionHeaderStartOffsetDec = rsrcSectionHeader.endOffsetDec + 1;
    const relocSectionHeader = this.file.getSegment(
      relocSectionHeaderStartOffsetDec,
      PortableExecutableConstants.sectionHeaderSize
    );
    const relocSectionItem = this.getSectionItem(relocSectionHeaderStartOffsetDec);

    return new SectionHeaders(textSectionHeader, textSectionItem, rsrcSectionHeader, rsrcSectionItem, relocSectionHeader, relocSectionItem);
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

  private setImportAddressTable(pe: PortableExecutable): void {
    if (!pe.isManaged) { return; }

    pe.importAddressTableSizeDec = HexHelper.getDecimal(pe.importAddressTableDirectory.size.hexValue);

    if (pe.importAddressTableSizeDec === 0) { return; }

    const importAddressTableStartOffsetDec =
      PortableExecutableReader.getFileOffsetInTextSectionFromRva(pe.importAddressTableDirectory.rva.rva, pe);

    pe.importAddressTable = this.file.getSegment(importAddressTableStartOffsetDec, pe.importAddressTableSizeDec);
  }

  private setCliHeader(pe: PortableExecutable) {
    if (!pe.isManaged) {
      return;
    }

    const cliHeaderStartOffsetDec =
      HexHelper.getDecimal(pe.textSectionItem.fileOffset.fileOffset) +
      HexHelper.getDecimal(pe.importAddressTableDirectory.size.hexValue);

    pe.cliHeaderSizeDec = HexHelper.getDecimal(pe.cliHeaderDirectory.size.hexValue);

    pe.cliHeader = this.file.getSegment(cliHeaderStartOffsetDec, pe.cliHeaderSizeDec);

    pe.cliMetadataHeaderDirectory = this.getDirectoryItem(
      cliHeaderStartOffsetDec,
      PortableExecutableConstants.cliMetadataHeaderDirectorySubOffsetDec
    );

    const flagsStartOffsetDec = cliHeaderStartOffsetDec + PortableExecutableConstants.cliFlagsSubOffsetDec;
    const flags = this.file.getHexSegment(flagsStartOffsetDec, PortableExecutableConstants.cliFlagsSizeDec);

    pe.cliFlags = new CliFlags(flags.startOffsetDec, flags.endOffsetDec, flags.sizeDec, flags.hexValue);
  }

  private setCliMetadataHeader(pe: PortableExecutable): void {
    if (!pe.isManaged) {
      return;
    }

    const cliManagedHeaderStartOffsetDec =
      HexHelper.getDecimal(pe.cliMetadataHeaderDirectory!.rva.rva) -
      HexHelper.getDecimal(pe.textSectionItem.baseRva.rva) +
      HexHelper.getDecimal(pe.textSectionItem.fileOffset.fileOffset);

    const cliManagedHeaderSizeDec = HexHelper.getDecimal(pe.cliMetadataHeaderDirectory!.size.hexValue);

    pe.cliMetadataHeader = this.file.getSegment(cliManagedHeaderStartOffsetDec, cliManagedHeaderSizeDec);

    this.setClrVersionSize(pe);
    this.setClrVersion(pe);
  }

  private setClrVersionSize(pe: PortableExecutable): void {
    const clrVersionSizeStartOffsetDec = pe.cliMetadataHeader!.startOffsetDec + PortableExecutableConstants.clrVersionSizeSubOffsetDec;

    pe.clrVersionSize = this.file.getHexSegment(clrVersionSizeStartOffsetDec, PortableExecutableConstants.clrVersionSizeSizeDec);
  }

  private setClrVersion(pe: PortableExecutable): void {
    const clrVersionStartOffsetDec = pe.clrVersionSize!.endOffsetDec + 1;
    const clrVersionSizeDec = HexHelper.getDecimal(pe.clrVersionSize!.hexValue);

    const asciiSegment = this.file.getAsciiSegment(clrVersionStartOffsetDec, clrVersionSizeDec);
    const trimmed = StringHelper.trimStartEndNullChars(asciiSegment.text);

    pe.clrVersion = new AsciiSegment(
      asciiSegment.startOffsetDec,
      asciiSegment.endOffsetDec,
      asciiSegment.text.length,
      trimmed.value);
  }

  private setImportTable(pe: PortableExecutable): void {
    if (!pe.isManaged) { return; }

    pe.importTableSizeDec = HexHelper.getDecimal(pe.importTableDirectory.size.hexValue);

    if (pe.importTableSizeDec === 0) { return; }

    const importTableStartOffsetDec =
      PortableExecutableReader.getFileOffsetInTextSectionFromRva(pe.importTableDirectory.rva.rva, pe);

    pe.importTable = this.file.getSegment(importTableStartOffsetDec, pe.importTableSizeDec);
  }

  private setEntryPoint(pe: PortableExecutable): void {
    if (!pe.isManaged) { return; }

    const entryPointRva = HexHelper.getDecimal(pe.addressOfEntryPoint.rva);

    if (entryPointRva === 0) { return; }

    const entryPointStartOffsetDec =
      PortableExecutableReader.getFileOffsetInTextSectionFromRva(pe.addressOfEntryPoint.rva, pe);

    pe.entryPoint = this.file.getSegment(entryPointStartOffsetDec, PortableExecutableConstants.entryPointSizeDec);

    this.setEntryPointOpCode(pe);
    this.setEntryPointRva(pe);
    this.setIatEntryPoint(pe);
    this.setManagedEntryPoint(pe);
  }

  private setEntryPointOpCode(pe: PortableExecutable): void {
    pe.entryPointOpCode = this.file.getOpCodeSegment(pe.entryPoint!.startOffsetDec, PortableExecutableConstants.entryPointOpCodeSizeDec);
  }

  private setEntryPointRva(pe: PortableExecutable): void {
    pe.entryPointVa = this.file.getVaSegment(pe.entryPointOpCode!.endOffsetDec + 1, PortableExecutableConstants.rvaSize);
  }

  private setIatEntryPoint(pe: PortableExecutable): void {
    const startOffsetDec = PortableExecutableReader.getFileOffsetInTextSectionFromVa(pe.entryPointVa!.va, pe);

    pe.iatEntryPointRva = this.file.getRvaSegment(startOffsetDec, PortableExecutableConstants.rvaSize);
  }

  private setManagedEntryPoint(pe: PortableExecutable): void {
    const startOffsetDec = PortableExecutableReader.getFileOffsetInTextSectionFromRva(pe.iatEntryPointRva!.rva, pe);

    const asciiSegment = this.file.getAsciiSegment(startOffsetDec, 25);
    const trimmed = StringHelper.trimStartEndNullChars(asciiSegment.text);

    const splitted = trimmed.value.split('\0');

    const methodStartOffsetDec = asciiSegment.startOffsetDec;
    const methodEndOffsetDec = File.getEndOffsetDec(methodStartOffsetDec, splitted[0].length + trimmed.removedFromStart);
    const method = new AsciiSegment(
      methodStartOffsetDec,
      methodEndOffsetDec,
      splitted[0].length,
      splitted[0]);

    const executableStartOffsetDec = method.endOffsetDec + 2;
    const executableEndOffsetDec = File.getEndOffsetDec(executableStartOffsetDec, splitted[1].length + trimmed.removedFromEnd);
    const executable = new AsciiSegment(
      executableStartOffsetDec,
      executableEndOffsetDec,
      splitted[1].length,
      splitted[1]);

    pe.managedEntryPoint = new EntryPoint(method, executable);
  }
}
