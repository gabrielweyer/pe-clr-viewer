import { SectionItem } from './section-item';
import { HexSegment, Segment, RvaSegment, FileOffsetSegment } from './segment';
import { DataDirectoryItem } from './data-directory-item';
import { Byte } from './byte';
import { CliFlags } from './cli-flags';
import { Subsystem } from './subsystem';
import { Characteristics } from './characteristics';

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
  public cliHeaderSize: number;
  public cliHeader: Segment;
  public cliFlags: CliFlags;
  public hexes: Byte[];
}
