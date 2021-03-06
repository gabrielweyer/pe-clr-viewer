import { HexHelper } from './hex-helper';
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
        new Byte(file.bytes[o].toString(16), this.getPart(pe, o, partVisitors), this.getSubPart(o, subPartVisitors))
      );
    }

    pe.hexes = hexes;
  }

  private static getEndOffsetDec(pe: PortableExecutable): number {
    let endOffsetDec = HexHelper.getDecimal(pe.relocSectionItem.fileOffset.fileOffset);

    if (endOffsetDec === 0) {
      endOffsetDec = HexHelper.getDecimal(pe.rsrcSectionItem.fileOffset.fileOffset);
    }

    return HexHelper.getNiceEndOffsetDec(endOffsetDec - 1);
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
    visitors.push(new PartVisitor(pe.importAddressTable, PortableExecutablePart.ImportAddressTable));
    visitors.push(new PartVisitor(pe.cliHeader, PortableExecutablePart.CliHeader));
    visitors.push(new PartVisitor(pe.cliMetadataHeader, PortableExecutablePart.CliMetadataHeader));
    visitors.push(new PartVisitor(pe.importTable, PortableExecutablePart.ImportTable));
    visitors.push(new PartVisitor(pe.entryPoint, PortableExecutablePart.EntryPoint));

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
      new SubPartVisitor(pe.characteristics, PortableExecutableSubPart.Characteristics),
      new SubPartVisitor(pe.magicNumber, PortableExecutableSubPart.MagicNumber),
      new SubPartVisitor(pe.addressOfEntryPoint, PortableExecutableSubPart.AddressOfEntryPoint),
      new SubPartVisitor(pe.imageBase, PortableExecutableSubPart.ImageBase),
      new SubPartVisitor(pe.subsystem, PortableExecutableSubPart.Subsystem),
      new SubPartVisitor(pe.dllCharacteristics, PortableExecutableSubPart.DllCharacteristics),
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
      new SubPartVisitor(pe.relocSectionItem.fileOffset, PortableExecutableSubPart.RelocFileOffset)
    );

    if (pe.isManaged) {
      visitors.push(
        new SubPartVisitor(pe.cliMetadataHeaderDirectory?.size, PortableExecutableSubPart.CliMetadataHeaderDirectorySize),
        new SubPartVisitor(pe.cliMetadataHeaderDirectory?.rva, PortableExecutableSubPart.CliMetadataHeaderDirectoryRva),
        new SubPartVisitor(pe.cliFlags, PortableExecutableSubPart.CliFlags),
        new SubPartVisitor(pe.clrVersionSize, PortableExecutableSubPart.ClrVersionSize),
        new SubPartVisitor(pe.clrVersion, PortableExecutableSubPart.ClrVersion),
        new SubPartVisitor(pe.entryPointOpCode, PortableExecutableSubPart.EntryPointOpCode),
        new SubPartVisitor(pe.entryPointVa, PortableExecutableSubPart.EntryPointVa),
        new SubPartVisitor(pe.iatEntryPointRva, PortableExecutableSubPart.IatEntryPointRva)
      );

      if (!pe.is64Bit) {
        visitors.push(
          new SubPartVisitor(pe.managedEntryPoint?.method, PortableExecutableSubPart.EntryPointMethod),
          new SubPartVisitor(pe.managedEntryPoint?.executable, PortableExecutableSubPart.EntryPointExecutable)
        );
      }
    }

    return visitors;
  }

  private static getSubPart(
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
