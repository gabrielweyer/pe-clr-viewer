import { SectionItem } from './section-item';
import { HexSegment, Segment, RvaSegment, FileOffsetSegment, AsciiSegment, VaSegment } from './segment';
import { DataDirectoryItem } from './data-directory-item';
import { Byte } from './byte';
import { CliFlags } from './cli-flags';
import { Subsystem } from './subsystem';
import { Characteristics } from './characteristics';
import { DllCharacteristics } from './dll-characteristics';
import { EntryPoint } from './entry-point';

export class PortableExecutable {
  public dosHeader: Segment;
  public signatureOffset: FileOffsetSegment;
  public dosStub: Segment;
  public signature: Segment;
  public coffHeader: Segment;
  public characteristics: Characteristics;
  public standardFields: Segment;
  public magicNumber: HexSegment;
  public is64Bit: boolean;
  public addressOfEntryPoint: RvaSegment;
  public ntSpecificFields: Segment;
  public imageBase: HexSegment;
  public subsystem: Subsystem;
  public dllCharacteristics: DllCharacteristics;
  public dataDirectories: Segment;
  public importTableDirectory: DataDirectoryItem;
  public importAddressTableDirectory: DataDirectoryItem;
  public cliHeaderDirectory: DataDirectoryItem;
  public isManaged: boolean;
  public textSectionHeader: Segment;
  public textSectionItem: SectionItem;
  public rsrcSectionHeader: Segment;
  public rsrcSectionItem: SectionItem;
  public relocSectionHeader: Segment;
  public relocSectionItem: SectionItem;
  public importAddressTableSizeDec?: number;
  public importAddressTable?: Segment;
  public cliHeaderSizeDec?: number;
  public cliHeader?: Segment;
  public cliFlags?: CliFlags;
  public cliMetadataHeaderDirectory?: DataDirectoryItem;
  public cliMetadataHeader?: Segment;
  public clrVersionSize?: HexSegment;
  public clrVersion?: AsciiSegment;
  public importTableSizeDec?: number;
  public importTable?: Segment;
  public entryPoint?: Segment;
  public entryPointOpCode?: HexSegment;
  public entryPointVa?: VaSegment;
  public iatEntryPointRva?: RvaSegment;
  public managedEntryPoint?: EntryPoint;
  public hexes: Byte[] = [];

  constructor(
    dosHeader: Segment,
    signatureOffset: FileOffsetSegment,
    dosStub: Segment,
    signature: Segment,
    coffHeader: Segment,
    characteristics: Characteristics,
    standardFields: Segment,
    magicNumber: HexSegment,
    is64Bit: boolean,
    addressOfEntryPoint: RvaSegment,
    ntSpecificFields: Segment,
    imageBase: HexSegment,
    subsystem: Subsystem,
    dllCharacteristics: DllCharacteristics,
    dataDirectories: Segment,
    importTableDirectory: DataDirectoryItem,
    importAddressTableDirectory: DataDirectoryItem,
    cliHeaderDirectory: DataDirectoryItem,
    isManaged: boolean,
    textSectionHeader: Segment,
    textSectionItem: SectionItem,
    rsrcSectionHeader: Segment,
    rsrcSectionItem: SectionItem,
    relocSectionHeader: Segment,
    relocSectionItem: SectionItem
  ) {
    this.dosHeader = dosHeader;
    this.signatureOffset = signatureOffset;
    this.dosStub = dosStub;
    this.signature = signature;
    this.coffHeader = coffHeader;
    this.characteristics = characteristics;
    this.standardFields = standardFields;
    this.magicNumber = magicNumber;
    this.is64Bit = is64Bit;
    this.addressOfEntryPoint = addressOfEntryPoint;
    this.ntSpecificFields = ntSpecificFields;
    this.imageBase = imageBase;
    this.subsystem = subsystem;
    this.dllCharacteristics = dllCharacteristics;
    this.dataDirectories = dataDirectories;
    this.importTableDirectory = importTableDirectory;
    this.importAddressTableDirectory = importAddressTableDirectory;
    this.cliHeaderDirectory = cliHeaderDirectory;
    this.isManaged = isManaged;
    this.textSectionHeader = textSectionHeader;
    this.textSectionItem = textSectionItem;
    this.rsrcSectionHeader = rsrcSectionHeader;
    this.rsrcSectionItem = rsrcSectionItem;
    this.relocSectionHeader = relocSectionHeader;
    this.relocSectionItem = relocSectionItem;
  }
}
