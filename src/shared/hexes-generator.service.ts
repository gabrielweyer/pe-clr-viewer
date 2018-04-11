import { CliFlags } from './../app/models/cli-flags';
import { PartVisitor } from './../app/models/part-visitor';
import { PortableExecutable } from './../app/models/portable-executable';
import { Byte } from '../app/models/byte';
import { File } from '../app/models/file';
import { PortableExecutablePart } from '../app/models/portable-executable-part.enum';
import { SubPartVisitor } from '../app/models/sub-part-visitor';
import { PortableExecutableSubPart } from '../app/models/portable-executable-sub-part.enum';

export class HexesGenerator {
  public static generate(file: File, pe: PortableExecutable) {
    const endOffsetDec = this.getEndOffsetDec(pe);
    const hexes = new Array<Byte>();

    const partVisitors = this.generatePartVisitors(pe);
    const subPartVisitors = this.generateSubPartVisitors(pe);

    for (let o = 0; o <= endOffsetDec; o++) {
      hexes.push(
        new Byte(file.bytes[o].toString(16), this.getPart(pe, o, partVisitors), this.getSubPart(pe, o, subPartVisitors))
      );
    }

    pe.hexes = hexes;
  }

  private static getEndOffsetDec(pe: PortableExecutable): number {
    let endOffsetDec = pe.isManaged ? pe.cliHeader.endOffsetDec : pe.dataDirectories.endOffsetDec;

    const remainder = (endOffsetDec + 1) % 16;

    if (remainder !== 0) {
      endOffsetDec += 16 - remainder;
    }

    return endOffsetDec;
  }

  private static generatePartVisitors(pe: PortableExecutable): Array<PartVisitor> {
    const visitors = new Array<PartVisitor>();

    visitors.push(new PartVisitor(pe.dosHeader, PortableExecutablePart.DosHeader));
    visitors.push(new PartVisitor(pe.dosStub, PortableExecutablePart.DosStub));
    visitors.push(new PartVisitor(pe.signature, PortableExecutablePart.Signature));
    visitors.push(new PartVisitor(pe.coffHeader, PortableExecutablePart.CoffHeader));
    visitors.push(new PartVisitor(pe.standardFields, PortableExecutablePart.StandardFields));
    visitors.push(new PartVisitor(pe.ntSpecificFields, PortableExecutablePart.NtSpecificFields));
    visitors.push(new PartVisitor(pe.dataDirectories, PortableExecutablePart.DataDirectories));
    visitors.push(new PartVisitor(pe.textSectionHeader, PortableExecutablePart.TextSectionHeader));
    visitors.push(new PartVisitor(pe.rsrcSectionHeader, PortableExecutablePart.RsrcSectionHeader));
    visitors.push(new PartVisitor(pe.relocSectionHeader, PortableExecutablePart.RelocSectionHeader));
    visitors.push(new PartVisitor(pe.cliHeader, PortableExecutablePart.CliHeader));

    return visitors;
  }

  private static getPart(pe: PortableExecutable, offset: number, visitors: Array<PartVisitor>): PortableExecutablePart {
    for (const visitor of visitors) {
      if (visitor.segment && offset >= visitor.segment.startOffsetDec && offset <= visitor.segment.endOffsetDec) {
        return visitor.part;
      }
    }

    return PortableExecutablePart.None;
  }

  private static generateSubPartVisitors(pe: PortableExecutable): Array<SubPartVisitor> {
    const visitors = new Array<SubPartVisitor>();

    visitors.push(
      new SubPartVisitor(pe.signatureOffset, PortableExecutableSubPart.SignatureOffset),
      new SubPartVisitor(pe.magicNumber, PortableExecutableSubPart.MagicNumber),
      new SubPartVisitor(pe.addressOfEntryPoint, PortableExecutableSubPart.AddressOfEntryPoint),
      new SubPartVisitor(pe.imageBase, PortableExecutableSubPart.ImageBase),
      new SubPartVisitor(pe.subsystem, PortableExecutableSubPart.Subsystem),
      new SubPartVisitor(pe.importTableDirectory.size, PortableExecutableSubPart.ImportTableDirectorySize),
      new SubPartVisitor(pe.importTableDirectory.rva, PortableExecutableSubPart.ImportTableDirectoryRva),
      new SubPartVisitor(
        pe.importAddressTableDirectory.size,
        PortableExecutableSubPart.ImportAddressTableDirectorySize
      ),
      new SubPartVisitor(pe.importAddressTableDirectory.rva, PortableExecutableSubPart.ImportAddressTableDirectoryRva),
      new SubPartVisitor(pe.cliHeaderDirectory.size, PortableExecutableSubPart.CliHeaderDirectorySize),
      new SubPartVisitor(pe.cliHeaderDirectory.rva, PortableExecutableSubPart.CliHeaderDirectoryRva),
      new SubPartVisitor(pe.textSectionItem.baseRva, PortableExecutableSubPart.TextBaseRva),
      new SubPartVisitor(pe.textSectionItem.fileOffset, PortableExecutableSubPart.TextFileOffset),
      new SubPartVisitor(pe.rsrcSectionItem.baseRva, PortableExecutableSubPart.RsrcBaseRva),
      new SubPartVisitor(pe.rsrcSectionItem.fileOffset, PortableExecutableSubPart.RsrcFileOffset),
      new SubPartVisitor(pe.relocSectionItem.baseRva, PortableExecutableSubPart.RelocBaseRva),
      new SubPartVisitor(pe.relocSectionItem.fileOffset, PortableExecutableSubPart.RelocFileOffset),
      new SubPartVisitor(pe.cliFlags, PortableExecutableSubPart.CliFlags)
    );

    return visitors;
  }

  private static getSubPart(
    pe: PortableExecutable,
    offset: number,
    visitors: Array<SubPartVisitor>
  ): PortableExecutableSubPart {
    for (const visitor of visitors) {
      if (visitor.segment && offset >= visitor.segment.startOffsetDec && offset <= visitor.segment.endOffsetDec) {
        return visitor.subPart;
      }
    }

    return PortableExecutableSubPart.None;
  }
}
