import { Component } from "@angular/core";
import { PortableExecutablePart } from "./portableExecutablePart.enum";
import { PortableExecutableSubPart } from "./portableExecutableSubPart.enum";
import { Byte } from "./byte.class";
import { BytePipe } from "./byte.pipe";
import { LeftPadPipe } from "./leftpad.pipe";
import { DataDirectoryItem } from "./dataDirectoyItem";
import { SectionItem } from "./sectionItem";
import { Segment } from "./segment";
import { AppConfig } from './app.config';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public isReading: boolean = false;
  public showGuide = true;
  public fileName: string;
  public hexes: Array<Byte>;

  public readonly rvaSize: number = 4;
  public readonly sizeSize: number = 4;

  public readonly dosHeaderStartOffsetDec: number = 0;
  public readonly dosHeaderSize: number = 64;
  public readonly dosHeaderEndOffsetDec: number = this.getEndOffset(this.dosHeaderStartOffsetDec, this.dosHeaderSize);
  private readonly signatureOffsetStartOffsetDec: number = 60;
  public readonly signatureOffsetSize: number = 4;
  private readonly signatureOffsetEndOffsetDec: number = this.getEndOffset(this.signatureOffsetStartOffsetDec, this.signatureOffsetSize);

  public readonly dosStubStartOffsetDec: number = this.dosHeaderEndOffsetDec + 1;
  public dosStubEndOffsetDec: number;

  public signatureStartOffsetDec: number;
  public readonly signatureSize: number = 4;
  public signatureEndOffsetDec: number;

  public coffHeaderStartOffsetDec: number;
  public readonly coffHeaderSize: number = 20;
  public coffHeaderEndOffsetDec: number;

  public standardFieldsStartOffsetDec: number;
  public magicNumberStartOffsetDec: number;
  public magicNumberSize: number = 2;
  public magicNumberEndOffsetDec: number;
  public magicNumberHex: string;
  public is64Bit: boolean;
  public readonly standardFieldsPE32Size: number = 28;
  public readonly standardFieldsPE32PlusSize: number = 24;
  public standardFieldsSize: number;
  public addressOfEntryPointSubOffsetDec = 16;
  public addressOfEntryPointSize = 4;
  public addressOfEntryPointStartOffsetDec: number;
  public addressOfEntryPointEndOffsetDec: number;
  public addressOfEntryPoint: string;
  public standardFieldsEndOffsetDec: number;

  public ntSpecificFieldsStartOffsetDec: number;
  public ntSpecificFieldsSize: number;
  public readonly ntSpecificFieldsPE32Size: number = 68;
  public readonly ntSpecificFieldsPE32PlusSize: number = 88;
  public ntSpecificFieldsEndOffsetDec: number;

  public dataDirectoriesStartOffsetDec: number;
  public readonly dataDirectoriesSize: number = 128;
  public readonly dataDirectoriesSubSize: number = 8;
  public readonly importTableDirectorySubOffsetDec: number = 8;
  public importTableDirectory: DataDirectoryItem;
  public readonly importAddressTableDirectorySubOffsetDec: number = 96;
  public importAddressTableDirectory: DataDirectoryItem;
  public readonly cliHeaderDirectorySubOffsetDec: number = 112;
  public cliHeaderDirectory: DataDirectoryItem;
  public isCli: boolean;
  public dataDirectoriesEndOffsetDec: number;

  public readonly sectionHeaderSize: number = 40;
  public readonly baseRvaSubOffsetDec: number = 12;
  public readonly fileOffsetSubOffsetDec: number = 20;
  public textSectionHeaderStartOffsetDec: number;
  public textSectionHeaderEndOffsetDec: number;
  public textSectionItem: SectionItem;
  public rsrcSectionHeaderStartOffsetDec: number;
  public rsrcSectionHeaderEndOffsetDec: number;
  public rsrcSectionItem: SectionItem;
  public relocSectionHeaderStartOffsetDec: number;
  public relocSectionHeaderEndOffsetDec: number;
  public relocSectionItem: SectionItem;

  public cliHeaderSize: number;
  public cliHeaderSegment: Segment;

  public build: string;
  public commit: string;

  private readonly fileReader = new FileReader();

  private static readonly bytePipe = new BytePipe();
  private static readonly leftPadPipe = new LeftPadPipe();

  constructor(private appConfig: AppConfig) {
    this.fileReader.onload = e => {
      this.onRead(this.fileReader.result);
    };

    this.build = appConfig.build;
    this.commit = appConfig.commit;
  }

  public onFileChange(event: EventTarget): void {
    if (this.isReading) return;

    this.isReading = true;

    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    const files: FileList = target.files;
    const file = files[0];

    this.fileName = file.name;

    this.fileReader.readAsArrayBuffer(file);
  }

  private onRead(buffer: ArrayBuffer): void {
    const dataview = new DataView(buffer);
    const bytes = new Uint8Array(buffer);

    const hexes = new Array<Byte>();

    // Signature offset

    const signatureOffsetHex = this.getHex(bytes, this.signatureOffsetStartOffsetDec, this.signatureOffsetEndOffsetDec);

    // Signature

    this.signatureStartOffsetDec = Number.parseInt(signatureOffsetHex, 16);
    this.signatureEndOffsetDec = this.getEndOffset(this.signatureStartOffsetDec, this.signatureSize);

    // DOS stub

    this.dosStubEndOffsetDec = this.signatureStartOffsetDec - 1;

    // COFF header

    this.coffHeaderStartOffsetDec = this.signatureEndOffsetDec + 1;
    this.coffHeaderEndOffsetDec = this.getEndOffset(this.coffHeaderStartOffsetDec, this.coffHeaderSize);

    // Standard fields

    this.standardFieldsStartOffsetDec = this.coffHeaderEndOffsetDec + 1;
    this.magicNumberStartOffsetDec = this.standardFieldsStartOffsetDec;
    this.magicNumberEndOffsetDec = this.getEndOffset(this.magicNumberStartOffsetDec, this.magicNumberSize);
    this.magicNumberHex = this.getHex(bytes, this.magicNumberStartOffsetDec, this.magicNumberEndOffsetDec);
    this.is64Bit = this.magicNumberHex === '020B';
    this.standardFieldsSize = this.is64Bit ? this.standardFieldsPE32PlusSize : this.standardFieldsPE32Size;
    this.addressOfEntryPointStartOffsetDec = this.standardFieldsStartOffsetDec + this.addressOfEntryPointSubOffsetDec;
    this.addressOfEntryPointEndOffsetDec = this.getEndOffset(this.addressOfEntryPointStartOffsetDec, this.addressOfEntryPointSize);
    this.addressOfEntryPoint = this.getHex(bytes, this.addressOfEntryPointStartOffsetDec, this.addressOfEntryPointEndOffsetDec);
    this.standardFieldsEndOffsetDec = this.getEndOffset(this.standardFieldsStartOffsetDec, this.standardFieldsSize);

    // Windows specific fields

    this.ntSpecificFieldsStartOffsetDec = this.standardFieldsEndOffsetDec + 1;
    this.ntSpecificFieldsSize = this.is64Bit ? this.ntSpecificFieldsPE32PlusSize : this.ntSpecificFieldsPE32Size;
    this.ntSpecificFieldsEndOffsetDec = this.getEndOffset(this.ntSpecificFieldsStartOffsetDec, this.ntSpecificFieldsSize);

    // Data directories

    this.dataDirectoriesStartOffsetDec = this.ntSpecificFieldsEndOffsetDec + 1;
    this.importTableDirectory = this.getDirectoryItem(bytes, this.importTableDirectorySubOffsetDec);
    this.importAddressTableDirectory = this.getDirectoryItem(bytes, this.importAddressTableDirectorySubOffsetDec);
    this.cliHeaderDirectory = this.getDirectoryItem(bytes, this.cliHeaderDirectorySubOffsetDec);
    this.isCli = this.cliHeaderDirectory.sizeHex !== '00000000';
    this.dataDirectoriesEndOffsetDec = this.getEndOffset(this.dataDirectoriesStartOffsetDec, this.dataDirectoriesSize);

    // .text section header

    this.textSectionHeaderStartOffsetDec = this.dataDirectoriesEndOffsetDec + 1;
    this.textSectionHeaderEndOffsetDec = this.getEndOffset(this.textSectionHeaderStartOffsetDec, this.sectionHeaderSize);
    this.textSectionItem = this.getSectionItem(bytes, this.textSectionHeaderStartOffsetDec);

    this.rsrcSectionHeaderStartOffsetDec = this.textSectionHeaderEndOffsetDec + 1;
    this.rsrcSectionHeaderEndOffsetDec = this.getEndOffset(this.rsrcSectionHeaderStartOffsetDec, this.sectionHeaderSize);
    this.rsrcSectionItem = this.getSectionItem(bytes, this.rsrcSectionHeaderStartOffsetDec);

    this.relocSectionHeaderStartOffsetDec = this.rsrcSectionHeaderEndOffsetDec + 1;
    this.relocSectionHeaderEndOffsetDec = this.getEndOffset(this.relocSectionHeaderStartOffsetDec, this.sectionHeaderSize);
    this.relocSectionItem = this.getSectionItem(bytes, this.relocSectionHeaderStartOffsetDec);

    // CLI header

    const cliHeaderStartOffsetDec = Number.parseInt(this.textSectionItem.fileOffsetHex, 16);
    this.cliHeaderSize = Number.parseInt(this.cliHeaderDirectory.sizeHex);
    this.cliHeaderSegment = new Segment(cliHeaderStartOffsetDec, this.cliHeaderSize);

    let endOffsetDec = this.isCli ? this.cliHeaderSegment.endOffsetDec : this.dataDirectoriesEndOffsetDec;

    const remainder = (endOffsetDec + 1) % 16;

    if (remainder !== 0) {
      endOffsetDec += 16 - remainder;
    }

    for (let o = 0; o <= endOffsetDec; o++) {
      hexes.push(new Byte(bytes[o].toString(16), this.getPart(o), this.getSubPart(o)))
    }

    this.hexes = hexes;
    this.isReading = false;
  }

  private getSectionItem(bytes: Uint8Array, startOffsetDec: number): SectionItem {
    const baseRvaSegment = new Segment(startOffsetDec + this.baseRvaSubOffsetDec, this.rvaSize)
    const baseRvaHex = this.getHex(bytes, baseRvaSegment.startOffsetDec, baseRvaSegment.endOffsetDec);

    const fileOffsetSegment = new Segment(startOffsetDec + this.fileOffsetSubOffsetDec, this.sizeSize);
    const fileOffsetHex = this.getHex(bytes, fileOffsetSegment.startOffsetDec, fileOffsetSegment.endOffsetDec);

    return new SectionItem(baseRvaSegment, baseRvaHex, fileOffsetSegment, fileOffsetHex);
  }

  private getDirectoryItem(bytes: Uint8Array, subOffsetDec: number): DataDirectoryItem {
    const rvaSegment = new Segment(this.dataDirectoriesStartOffsetDec + subOffsetDec, this.rvaSize);
    const rvaHex = this.getHex(bytes, rvaSegment.startOffsetDec, rvaSegment.endOffsetDec);

    const sizeSegment = new Segment(rvaSegment.endOffsetDec + 1, this.sizeSize);
    const sizeHex = this.getHex(bytes, sizeSegment.startOffsetDec, sizeSegment.endOffsetDec);

    return new DataDirectoryItem(rvaSegment, rvaHex, sizeSegment, sizeHex);
  }

  private getEndOffset(startOffsetDec: number, size: number): number {
    return startOffsetDec + size - 1;
  }

  private getHex(bytes: Uint8Array, startOffsetDec: number, endOffsetDec: number): string {
    return bytes
      .filter((v, i) => i >= startOffsetDec && i <= endOffsetDec)
      .reduce((previous, current) => AppComponent.leftPadPipe.transform(AppComponent.bytePipe.transform(current), 2) + previous, '');
  }

  private getPart(index: number): PortableExecutablePart {
    if (index <= this.dosHeaderEndOffsetDec) {
      return PortableExecutablePart.DosHeader;
    }

    if (index >= this.dosStubStartOffsetDec && index <= this.dosStubEndOffsetDec) {
      return PortableExecutablePart.DosStub;
    }

    if (index >= this.signatureStartOffsetDec && index <= this.signatureEndOffsetDec) {
      return PortableExecutablePart.Signature;
    }

    if (index >= this.coffHeaderStartOffsetDec && index <= this.coffHeaderEndOffsetDec) {
      return PortableExecutablePart.CoffHeader;
    }

    if (index >= this.standardFieldsStartOffsetDec && index <= this.standardFieldsEndOffsetDec) {
      return PortableExecutablePart.StandardFields;
    }

    if (index >= this.ntSpecificFieldsStartOffsetDec && index <= this.ntSpecificFieldsEndOffsetDec) {
      return PortableExecutablePart.NtSpecificFields;
    }

    if (index >= this.dataDirectoriesStartOffsetDec && index <= this.dataDirectoriesEndOffsetDec) {
      return PortableExecutablePart.DataDirectories;
    }

    if (index >= this.textSectionHeaderStartOffsetDec && index <= this.textSectionHeaderEndOffsetDec) {
      return PortableExecutablePart.TextSectionHeader;
    }

    if (index >= this.rsrcSectionHeaderStartOffsetDec && index <= this.rsrcSectionHeaderEndOffsetDec) {
      return PortableExecutablePart.RsrcSectionHeader;
    }

    if (index >= this.relocSectionHeaderStartOffsetDec && index <= this.relocSectionHeaderEndOffsetDec) {
      return PortableExecutablePart.RelocSectionHeader;
    }

    if (index >= this.cliHeaderSegment.startOffsetDec && index <= this.cliHeaderSegment.endOffsetDec) {
      return PortableExecutablePart.CliHeader;
    }

    return PortableExecutablePart.CantBeBothered;
  }

  private getSubPart(index: number): PortableExecutableSubPart {
    if (index >= this.signatureOffsetStartOffsetDec && index <= this.signatureOffsetEndOffsetDec) {
      return PortableExecutableSubPart.SignatureOffset;
    }

    if (index >= this.magicNumberStartOffsetDec && index <= this.magicNumberEndOffsetDec) {
      return PortableExecutableSubPart.MagicNumber;
    }

    if (index >= this.addressOfEntryPointStartOffsetDec && index <= this.addressOfEntryPointEndOffsetDec) {
      return PortableExecutableSubPart.AddressOfEntryPoint;
    }

    if (index >= this.importTableDirectory.sizeSegment.startOffsetDec && index <= this.importTableDirectory.sizeSegment.endOffsetDec) {
      return PortableExecutableSubPart.ImportTableDirectorySize;
    }

    if (index >= this.importTableDirectory.rvaSegment.startOffsetDec && index <= this.importTableDirectory.rvaSegment.endOffsetDec) {
      return PortableExecutableSubPart.ImportTableDirectoryRva;
    }

    if (index >= this.importAddressTableDirectory.sizeSegment.startOffsetDec && index <= this.importAddressTableDirectory.sizeSegment.endOffsetDec) {
      return PortableExecutableSubPart.ImportAddressTableDirectorySize;
    }

    if (index >= this.importAddressTableDirectory.rvaSegment.startOffsetDec && index <= this.importAddressTableDirectory.rvaSegment.endOffsetDec) {
      return PortableExecutableSubPart.ImportAddressTableDirectoryRva;
    }

    if (index >= this.cliHeaderDirectory.sizeSegment.startOffsetDec && index <= this.cliHeaderDirectory.sizeSegment.endOffsetDec) {
      return PortableExecutableSubPart.CliHeaderDirectorySize;
    }

    if (index >= this.cliHeaderDirectory.rvaSegment.startOffsetDec && index <= this.cliHeaderDirectory.rvaSegment.endOffsetDec) {
      return PortableExecutableSubPart.CliHeaderDirectoryRva;
    }

    if (index >= this.textSectionItem.baseRvaSegment.startOffsetDec && index <= this.textSectionItem.baseRvaSegment.endOffsetDec) {
      return PortableExecutableSubPart.TextBaseRva;
    }

    if (index >= this.textSectionItem.fileOffsetSegment.startOffsetDec && index <= this.textSectionItem.fileOffsetSegment.endOffsetDec) {
      return PortableExecutableSubPart.TextFileOffset;
    }

    if (index >= this.rsrcSectionItem.baseRvaSegment.startOffsetDec && index <= this.rsrcSectionItem.baseRvaSegment.endOffsetDec) {
      return PortableExecutableSubPart.RsrcBaseRva;
    }

    if (index >= this.rsrcSectionItem.fileOffsetSegment.startOffsetDec && index <= this.rsrcSectionItem.fileOffsetSegment.endOffsetDec) {
      return PortableExecutableSubPart.RsrcFileOffset;
    }

    if (index >= this.relocSectionItem.baseRvaSegment.startOffsetDec && index <= this.relocSectionItem.baseRvaSegment.endOffsetDec) {
      return PortableExecutableSubPart.RelocBaseRva;
    }

    if (index >= this.relocSectionItem.fileOffsetSegment.startOffsetDec && index <= this.relocSectionItem.fileOffsetSegment.endOffsetDec) {
      return PortableExecutableSubPart.RelocFileOffset;
    }

    return PortableExecutableSubPart.None;
  }

  handleShowGuide() {
    this.showGuide = !this.showGuide;
  }
}
