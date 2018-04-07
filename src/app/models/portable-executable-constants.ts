import { File } from './file';

export class PortableExecutableConstants {
  public static readonly rvaSize: number = 4;
  public static readonly sizeSize: number = 4;

  public static readonly dosHeaderStartOffsetDec: number = 0;
  public static readonly dosHeaderSizeDec: number = 64;

  public static readonly signatureOffsetStartOffsetDec: number = 60;
  public static readonly signatureOffsetSizeDec: number = 4;

  public static readonly dosStubStartOffsetDec: number = File.getEndOffsetDec(
    PortableExecutableConstants.dosHeaderStartOffsetDec,
    PortableExecutableConstants.dosHeaderSizeDec
  ) + 1;

  public static readonly signatureSizeDec: number = 4;

  public static readonly coffHeaderSizeDec = 20;

  public static readonly magicNumberSizeDec = 2;

  public static readonly standardFieldsPE32SizeDec: number = 28;
  public static readonly standardFieldsPE32PlusSizeDec: number = 24;

  public static readonly addressOfEntryPointSubOffsetDec: number = 16;
  public static readonly addressOfEntryPointSizeDec: number = 4;

  public static readonly ntSpecificFieldsPE32SizeDec: number = 68;
  public static readonly ntSpecificFieldsPE32PlusSizeDec: number = 88;

  public static readonly imageBasePE32SizeDec: number = 4;
  public static readonly imageBasePE32PlusSizeDec: number = 8;

  public static readonly dataDirectoriesSizeDec: number = 128;
  public static readonly importTableDirectorySubOffsetDec: number = 8;
  public static readonly importAddressTableDirectorySubOffsetDec: number = 96;
  public static readonly cliHeaderDirectorySubOffsetDec: number = 112;

  public static readonly sectionHeaderSize: number = 40;
  public static readonly baseRvaSubOffsetDec: number = 12;
  public static readonly fileOffsetSubOffsetDec: number = 20;
}
