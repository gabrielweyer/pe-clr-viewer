import { SectionItem } from './../app/models/section-item';
import { DataDirectoryItem } from './../app/models/data-directory-item';
import { FileOffsetSegment, Segment, HexSegment, RvaSegment } from './../app/models/segment';
import { PortableExecutablePart } from './../app/models/portable-executable-part.enum';
import { PortableExecutableReader } from './portable-executable-reader.service';
import { NATIVE_X64 } from '../../tests-data/native-x64';
import { Subsystem } from '../app/models/subsystem';
import { SubsystemType } from '../app/models/subsystem-type.enum';
import { Characteristics } from '../app/models/characteristics';
import { DllCharacteristics } from '../app/models/dll-characteristics';

describe('PortableExecutableReader', () => {
  describe('Given native x64', () => {
    const bytes = new Uint8Array(NATIVE_X64);
    const target = new PortableExecutableReader(bytes);

    const expectedSignatureStartOffsetHex = '000000E8';
    const expectedSignatureStartOffsetDec = 232;
    const expectedSectionHeaderSizeDec = 40;
    const expectedCliHeaderSizeHex = '00000000';
    const expectedCliHeaderSizeDec = 0;
    const expectedTextSectionFileOffsetHex = '00000400';
    const expectedTextSectionFileOffsetDec = 512;
    const expectedImportAddressTableDirectorySizeHex = '00000440';
    const expectedImportAddressTableDirectorySizeDec = 1088;

    describe('When read', () => {
      const pe = target.read();

      describe('DOS header', () => {
        const expectedStartOffsetDec = 0;
        const expectedEndOffsetDec = 63;
        const expectedSizeDec = 64;

        it('Then set property: "dosHeader"', () => {
          const expected = new Segment(expectedStartOffsetDec, expectedEndOffsetDec, expectedSizeDec);

          expect(pe.dosHeader).toEqual(expected);
        });

        it('Then set DOS header hexes', () => {
          const dosHeader = pe.hexes.slice(expectedStartOffsetDec, expectedEndOffsetDec);

          dosHeader.forEach((element, offset) => {
            expect(element.isDosHeader()).toBeTruthy(offset);
          });
        });

        describe('Signature offset', () => {
          const expectedSubStartOffsetDec = 60;
          const expectedSubEndOffsetDec = 63;
          const expectedSubSizeDec = 4;

          it('Then set property: "signatureOffset"', () => {
            const expected = new FileOffsetSegment(
              expectedSubStartOffsetDec,
              expectedSubEndOffsetDec,
              expectedSubSizeDec,
              expectedSignatureStartOffsetHex
            );

            expect(pe.signatureOffset).toEqual(expected);
          });

          it('Then set signature offset hexes', () => {
            const signatureOffset = pe.hexes.slice(expectedSubStartOffsetDec, expectedSubEndOffsetDec);

            signatureOffset.forEach((element, offset) => {
              expect(element.isSignatureOffset()).toBeTruthy(offset);
            });
          });
        });
      });

      describe('DOS stub', () => {
        const expectedStartOffset = 64;
        const expectedEndOffset = 231;
        const expectedSizeDec = 167;

        it('Then set property: "dosStub"', () => {
          const expected = new Segment(expectedStartOffset, expectedEndOffset, expectedSizeDec);

          expect(pe.dosStub).toEqual(expected);
        });

        it('Then set DOS stub hexes', () => {
          const dosStub = pe.hexes.slice(expectedStartOffset, expectedEndOffset);

          dosStub.forEach((element, offset) => {
            expect(element.isDosStub()).toBeTruthy(offset);
          });
        });
      });

      describe('Signature', () => {
        const expectedEndOffsetDec = 235;
        const expectedSizeDec = 4;

        it('Then set property: "signature"', () => {
          const expected = new Segment(expectedSignatureStartOffsetDec, expectedEndOffsetDec, expectedSizeDec);

          expect(pe.signature).toEqual(expected);
        });

        it('Then set signature hexes', () => {
          const signature = pe.hexes.slice(expectedSignatureStartOffsetDec, expectedEndOffsetDec);

          signature.forEach((element, offset) => {
            expect(element.isSignature()).toBeTruthy(offset);
          });
        });
      });

      describe('COFF header', () => {
        const expectedStartOffsetDec = 236;
        const expectedEndOffsetDec = 255;
        const expectedSizeDec = 20;

        it('Then set property: "coffHeader"', () => {
          const expected = new Segment(expectedStartOffsetDec, expectedEndOffsetDec, expectedSizeDec);

          expect(pe.coffHeader).toEqual(expected);
        });

        it('Then set COFF header hexes', () => {
          const coffHeader = pe.hexes.slice(expectedStartOffsetDec, expectedEndOffsetDec);

          coffHeader.forEach((element, offset) => {
            expect(element.isCoffHeader()).toBeTruthy(offset);
          });
        });

        describe('Characteristics', () => {
          const expectedSubStartOffsetDec = 254;
          const expectedSubEndOffsetDec = 255;
          const expectedSubSizeDec = 2;

          it('Then set property: "characteristics"', () => {
            const expected = new Characteristics(
              expectedSubStartOffsetDec,
              expectedSubEndOffsetDec,
              expectedSubSizeDec,
              '0023'
            );

            expect(pe.characteristics).toEqual(expected);
          });

          it('Then set characteristics hexes', () => {
            const characteristics = pe.hexes.slice(expectedSubStartOffsetDec, expectedSubEndOffsetDec);

            characteristics.forEach((element, offset) => {
              expect(element.isCharacteristics()).toBeTruthy(offset);
            });
          });
        });
      });

      describe('Standard fields', () => {
        const expectedStartOffsetDec = 256;
        const expectedEndOffsetDec = 279;
        const expectedSizeDec = 24;

        it('Then set property: "standardFields" (24 bytes as x64)', () => {
          const expected = new Segment(expectedStartOffsetDec, expectedEndOffsetDec, expectedSizeDec);

          expect(pe.standardFields).toEqual(expected);
        });

        it('Then set standard fields hexes', () => {
          const standardFields = pe.hexes.slice(expectedStartOffsetDec, expectedEndOffsetDec);

          standardFields.forEach((element, offset) => {
            expect(element.isStandardFields()).toBeTruthy(offset);
          });
        });

        describe('Magic number (bitness)', () => {
          const expectedSubStartOffsetDec = 256;
          const expectedSubEndOffsetDec = 257;
          const expectedSubSizeDec = 2;

          it('Then set property: "magicNumber" to "020B" (x64)', () => {
            const expected = new HexSegment(
              expectedSubStartOffsetDec,
              expectedSubEndOffsetDec,
              expectedSubSizeDec,
              '020B'
            );

            expect(pe.magicNumber).toEqual(expected);
          });

          it('Then set property: "is64Bit" to "true"', () => {
            expect(pe.is64Bit).toBeTruthy();
          });

          it('Then set magic number hexes', () => {
            const magicNumber = pe.hexes.slice(expectedSubStartOffsetDec, expectedSubEndOffsetDec);

            magicNumber.forEach((element, offset) => {
              expect(element.isMagicNumber()).toBeTruthy(offset);
            });
          });
        });

        describe('Address of entry point', () => {
          const expectedSubStartOffsetDec = 272;
          const expectedSubEndOffsetDec = 275;
          const expectedSubSizeDec = 4;

          it('Then set property: "addressOfEntryPoint"', () => {
            const expected = new RvaSegment(
              expectedSubStartOffsetDec,
              expectedSubEndOffsetDec,
              expectedSubSizeDec,
              '0000549C'
            );

            expect(pe.addressOfEntryPoint).toEqual(expected);
          });

          it('Then set address of entry point hexes', () => {
            const addressOfEntryPoint = pe.hexes.slice(expectedSubStartOffsetDec, expectedSubEndOffsetDec);

            addressOfEntryPoint.forEach((element, offset) => {
              expect(element.isAddressOfEntryPoint()).toBeTruthy(offset);
            });
          });
        });
      });

      describe('NT specific fields', () => {
        const expectedStartOffsetDec = 280;
        const expectedEndOffsetDec = 367;
        const expectedSizeDec = 88;

        it('Then set property: "ntSpecificFields" (88 bytes as x64)', () => {
          const expected = new Segment(expectedStartOffsetDec, expectedEndOffsetDec, expectedSizeDec);

          expect(pe.ntSpecificFields).toEqual(expected);
        });

        it('Then set NT specific fields hexes', () => {
          const ntSpecificFields = pe.hexes.slice(expectedStartOffsetDec, expectedEndOffsetDec);

          ntSpecificFields.forEach((element, offset) => {
            expect(element.isNtSpecificFields()).toBeTruthy(offset);
          });
        });

        describe('ImageBase', () => {
          const expectedSubStartOffsetDec = 280;
          const expectedSubEndOffsetDec = 287;
          const expectedSubSizeDec = 8;

          it('Then set property: "imageBase"', () => {
            const expected = new HexSegment(
              expectedSubStartOffsetDec,
              expectedSubEndOffsetDec,
              expectedSubSizeDec,
              '0000000140000000'
            );

            expect(pe.imageBase).toEqual(expected);
          });

          it('Then set ImageBase hexes', () => {
            const imageBase = pe.hexes.slice(expectedSubStartOffsetDec, expectedSubEndOffsetDec);

            imageBase.forEach((element, offset) => {
              expect(element.isImageBase()).toBeTruthy(offset);
            });
          });
        });

        describe('Subsystem', () => {
          const expectedSubStartOffsetDec = 324;
          const expectedSubEndOffsetDec = 325;
          const expectedSubSizeDec = 2;

          it('Then set property: "subsystem"', () => {
            const expected = new Subsystem(
              expectedSubStartOffsetDec,
              expectedSubEndOffsetDec,
              expectedSubSizeDec,
              '0003'
            );

            expect(pe.subsystem).toEqual(expected);
          });

          it('Then set subsystem as "WindowsCui"', () => {
            expect(pe.subsystem.type).toBe(SubsystemType.WindowsCui);
          });

          it('Then set Subsystem hexes', () => {
            const subsystem = pe.hexes.slice(expectedSubStartOffsetDec, expectedSubEndOffsetDec);

            subsystem.forEach((element, offset) => {
              expect(element.isSubsystem()).toBeTruthy(offset);
            });
          });
        });

        describe('DLL Characteristics', () => {
          const expectedSubStartOffsetDec = 326;
          const expectedSubEndOffsetDec = 327;
          const expectedSubSizeDec = 2;

          it('Then set property: "dllCharacteristics"', () => {
            const expected = new DllCharacteristics(
              expectedSubStartOffsetDec,
              expectedSubEndOffsetDec,
              expectedSubSizeDec,
              '8120'
            );

            expect(pe.dllCharacteristics).toEqual(expected);
          });

          it('Then set DLL Characteristics hexes', () => {
            const dllCharacteristics = pe.hexes.slice(expectedSubStartOffsetDec, expectedSubEndOffsetDec);

            dllCharacteristics.forEach((element, offset) => {
              expect(element.isDllCharacteristics()).toBeTruthy(offset);
            });
          });
        });
      });

      describe('data directories fields', () => {
        const expectedStartOffsetDec = 368;
        const expectedEndOffsetDec = 495;
        const expectedSizeDec = 128;
        const expectedSubSubSizeDec = 4;

        it('Then set property: "dataDirectories"', () => {
          const expected = new Segment(expectedStartOffsetDec, expectedEndOffsetDec, expectedSizeDec);

          expect(pe.dataDirectories).toEqual(expected);
        });

        it('Then set data directories hexes', () => {
          const dataDirectories = pe.hexes.slice(expectedStartOffsetDec, expectedEndOffsetDec);

          dataDirectories.forEach((element, offset) => {
            expect(element.isDataDirectories()).toBeTruthy(offset);
          });
        });

        describe('Import table', () => {
          const expectedRvaStartOffsetDec = 376;
          const expectedRvaEndOffsetDec = 379;
          const expectedHexStartOffsetDec = 380;
          const expectedHexEndOffsetDec = 383;

          it('Then set property: "importTableDirectory"', () => {
            const expectedRva = new RvaSegment(
              expectedRvaStartOffsetDec,
              expectedRvaEndOffsetDec,
              expectedSubSubSizeDec,
              '0002F210'
            );
            const expectedHex = new HexSegment(
              expectedHexStartOffsetDec,
              expectedHexEndOffsetDec,
              expectedSubSubSizeDec,
              '00000078'
            );
            const expected = new DataDirectoryItem(expectedRva, expectedHex);

            expect(pe.importTableDirectory).toEqual(expected);
          });

          it('Then set import table directory RVA hexes', () => {
            const rva = pe.hexes.slice(expectedRvaStartOffsetDec, expectedRvaEndOffsetDec);

            rva.forEach((element, offset) => {
              expect(element.isImportTableDirectoryRva()).toBeTruthy(offset);
            });
          });

          it('Then set import table directory size hexes', () => {
            const size = pe.hexes.slice(expectedHexStartOffsetDec, expectedHexEndOffsetDec);

            size.forEach((element, offset) => {
              expect(element.isImportTableDirectorySize()).toBeTruthy(offset);
            });
          });
        });

        describe('Import address table', () => {
          const expectedRvaStartOffsetDec = 464;
          const expectedRvaEndOffsetDec = 467;
          const expectedHexStartOffsetDec = 468;
          const expectedHexEndOffsetDec = 471;

          it('Then set property: "importAddressTableDirectory"', () => {
            const expectedRva = new RvaSegment(
              expectedRvaStartOffsetDec,
              expectedRvaEndOffsetDec,
              expectedSubSubSizeDec,
              '00021000'
            );
            const expectedHex = new HexSegment(
              expectedHexStartOffsetDec,
              expectedHexEndOffsetDec,
              expectedSubSubSizeDec,
              expectedImportAddressTableDirectorySizeHex
            );
            const expected = new DataDirectoryItem(expectedRva, expectedHex);

            expect(pe.importAddressTableDirectory).toEqual(expected);
          });

          it('Then set import address table directory RVA hexes', () => {
            const rva = pe.hexes.slice(expectedRvaStartOffsetDec, expectedRvaEndOffsetDec);

            rva.forEach((element, offset) => {
              expect(element.isImportAddressTableDirectoryRva()).toBeTruthy(offset);
            });
          });

          it('Then set import address table directory size hexes', () => {
            const size = pe.hexes.slice(expectedHexStartOffsetDec, expectedHexEndOffsetDec);

            size.forEach((element, offset) => {
              expect(element.isImportAddressTableDirectorySize()).toBeTruthy(offset);
            });
          });
        });

        describe('Import cli header', () => {
          const expectedRvaStartOffsetDec = 480;
          const expectedRvaEndOffsetDec = 483;
          const expectedHexStartOffsetDec = 484;
          const expectedHexEndOffsetDec = 487;

          it('Then set property: "cliHeaderDirectory"', () => {
            const expectedRva = new RvaSegment(
              expectedRvaStartOffsetDec,
              expectedRvaEndOffsetDec,
              expectedSubSubSizeDec,
              '00000000'
            );
            const expectedHex = new HexSegment(
              expectedHexStartOffsetDec,
              expectedHexEndOffsetDec,
              expectedSubSubSizeDec,
              expectedCliHeaderSizeHex
            );
            const expected = new DataDirectoryItem(expectedRva, expectedHex);

            expect(pe.cliHeaderDirectory).toEqual(expected);
          });

          it('Then set cli header directory RVA hexes', () => {
            const rva = pe.hexes.slice(expectedRvaStartOffsetDec, expectedRvaEndOffsetDec);

            rva.forEach((element, offset) => {
              expect(element.isCliHeaderDirectoryRva()).toBeTruthy(offset);
            });
          });

          it('Then set cli header directory size hexes', () => {
            const size = pe.hexes.slice(expectedHexStartOffsetDec, expectedHexEndOffsetDec);

            size.forEach((element, offset) => {
              expect(element.isCliHeaderDirectorySize()).toBeTruthy(offset);
            });
          });

          it('Then set property: "isManaged" to "false"', () => {
            expect(pe.isManaged).toBeFalsy();
          });
        });
      });

      describe('.text section header', () => {
        const expectedStartOffsetDec = 496;
        const expectedEndOffsetDec = 535;
        const expectedBaseRvaStartOffsetDec = 508;
        const expectedBaseRvaEndOffsetDec = 511;
        const expectedFileOffsetStartOffsetDec = 516;
        const expectedFileOffsetEndOffsetDec = 519;

        it('Then set property: "textSectionHeader"', () => {
          const expected = new Segment(expectedStartOffsetDec, expectedEndOffsetDec, expectedSectionHeaderSizeDec);

          expect(pe.textSectionHeader).toEqual(expected);
        });

        it('Then set .text section header hexes', () => {
          const textSectionHeader = pe.hexes.slice(expectedStartOffsetDec, expectedEndOffsetDec);

          textSectionHeader.forEach((element, offset) => {
            expect(element.isTextSectionHeader()).toBeTruthy(offset);
          });
        });

        it('Then set property: "textSectionItem"', () => {
          const expectedBaseRva = new RvaSegment(
            expectedBaseRvaStartOffsetDec,
            expectedBaseRvaEndOffsetDec,
            4,
            '00001000'
          );
          const expectedFileOffset = new FileOffsetSegment(
            expectedFileOffsetStartOffsetDec,
            expectedFileOffsetEndOffsetDec,
            4,
            expectedTextSectionFileOffsetHex
          );
          const expected = new SectionItem(expectedBaseRva, expectedFileOffset);

          expect(pe.textSectionItem).toEqual(expected);
        });

        it('Then set .text section header base RVA hexes', () => {
          const baseRva = pe.hexes.slice(expectedBaseRvaStartOffsetDec, expectedBaseRvaEndOffsetDec);

          baseRva.forEach((element, offset) => {
            expect(element.isTextBaseRva()).toBeTruthy(offset);
          });
        });

        it('Then set .text section header file offset hexes', () => {
          const fileOffset = pe.hexes.slice(expectedFileOffsetStartOffsetDec, expectedFileOffsetEndOffsetDec);

          fileOffset.forEach((element, offset) => {
            expect(element.isTextFileOffset()).toBeTruthy(offset);
          });
        });
      });

      describe('.rsrc section header', () => {
        const expectedStartOffsetDec = 536;
        const expectedEndOffsetDec = 575;
        const expectedBaseRvaStartOffsetDec = 548;
        const expectedBaseRvaEndOffsetDec = 551;
        const expectedFileOffsetStartOffsetDec = 556;
        const expectedFileOffsetEndOffsetDec = 559;

        it('Then set property: "rsrcSectionHeader"', () => {
          const expected = new Segment(expectedStartOffsetDec, expectedEndOffsetDec, expectedSectionHeaderSizeDec);

          expect(pe.rsrcSectionHeader).toEqual(expected);
        });

        it('Then set .rsrc section header hexes', () => {
          const rsrcSectionHeader = pe.hexes.slice(expectedStartOffsetDec, expectedEndOffsetDec);

          rsrcSectionHeader.forEach((element, offset) => {
            expect(element.isRsrcSectionHeader()).toBeTruthy(offset);
          });
        });

        it('Then set property: "rsrcSectionItem"', () => {
          const expectedBaseRva = new RvaSegment(
            expectedBaseRvaStartOffsetDec,
            expectedBaseRvaEndOffsetDec,
            4,
            '00021000'
          );
          const expectedFileOffset = new FileOffsetSegment(
            expectedFileOffsetStartOffsetDec,
            expectedFileOffsetEndOffsetDec,
            4,
            '0001F600'
          );
          const expected = new SectionItem(expectedBaseRva, expectedFileOffset);

          expect(pe.rsrcSectionItem).toEqual(expected);
        });

        it('Then set .rsrc section header base RVA hexes', () => {
          const baseRva = pe.hexes.slice(expectedBaseRvaStartOffsetDec, expectedBaseRvaEndOffsetDec);

          baseRva.forEach((element, offset) => {
            expect(element.isRsrcBaseRva()).toBeTruthy(offset);
          });
        });

        it('Then set .rsrc section header file offset hexes', () => {
          const fileOffset = pe.hexes.slice(expectedFileOffsetStartOffsetDec, expectedFileOffsetEndOffsetDec);

          fileOffset.forEach((element, offset) => {
            expect(element.isRsrcFileOffset()).toBeTruthy(offset);
          });
        });
      });

      describe('.reloc section header', () => {
        const expectedStartOffsetDec = 576;
        const expectedEndOffsetDec = 615;
        const expectedBaseRvaStartOffsetDec = 588;
        const expectedBaseRvaEndOffsetDec = 591;
        const expectedFileOffsetStartOffsetDec = 596;
        const expectedFileOffsetEndOffsetDec = 599;

        it('Then set property: "relocSectionHeader"', () => {
          const expected = new Segment(expectedStartOffsetDec, expectedEndOffsetDec, expectedSectionHeaderSizeDec);

          expect(pe.relocSectionHeader).toEqual(expected);
        });

        it('Then set .reloc section header hexes', () => {
          const relocSectionHeader = pe.hexes.slice(expectedStartOffsetDec, expectedEndOffsetDec);

          relocSectionHeader.forEach((element, offset) => {
            expect(element.isRelocSectionHeader()).toBeTruthy(offset);
          });
        });

        it('Then set property: "relocSectionItem"', () => {
          const expectedBaseRva = new RvaSegment(
            expectedBaseRvaStartOffsetDec,
            expectedBaseRvaEndOffsetDec,
            4,
            '00031000'
          );
          const expectedFileOffset = new FileOffsetSegment(
            expectedFileOffsetStartOffsetDec,
            expectedFileOffsetEndOffsetDec,
            4,
            '0002E800'
          );
          const expected = new SectionItem(expectedBaseRva, expectedFileOffset);

          expect(pe.relocSectionItem).toEqual(expected);
        });

        it('Then set .reloc section header base RVA hexes', () => {
          const baseRva = pe.hexes.slice(expectedBaseRvaStartOffsetDec, expectedBaseRvaEndOffsetDec);

          baseRva.forEach((element, offset) => {
            expect(element.isRelocBaseRva()).toBeTruthy(offset);
          });
        });

        it('Then set .reloc section header file offset hexes', () => {
          const fileOffset = pe.hexes.slice(expectedFileOffsetStartOffsetDec, expectedFileOffsetEndOffsetDec);

          fileOffset.forEach((element, offset) => {
            expect(element.isRelocFileOffset()).toBeTruthy(offset);
          });
        });
      });

      describe('Import address table', () => {
        it('Then does not set property: "importAddressTable"', () => {
          expect(pe.importAddressTableSizeDec).toBeUndefined();
          expect(pe.importAddressTable).toBeUndefined();
        });
      });

      describe('CLI header', () => {
        it('Then does not set property: "cliHeader"', () => {
          expect(pe.cliHeader).toBeUndefined();
        });

        it('Then does not set property: "cliMetadataHeaderDirectory"', () => {
          expect(pe.cliMetadataHeaderDirectory).toBeUndefined();
        });

        it('Then does not set property: "cliFlags"', () => {
          expect(pe.cliFlags).toBeUndefined();
        });
      });

      describe('CLI metadata header', () => {
        it('Then does not set property: "cliMetadataHeader"', () => {
          expect(pe.cliMetadataHeader).toBeUndefined();
        });

        it('Then does not set property: "clrVersionSize"', () => {
          expect(pe.clrVersionSize).toBeUndefined();
        });
      });

      describe('Import table', () => {
        it('Then does not set property: "importTable"', () => {
          expect(pe.importTableSizeDec).toBeUndefined();
          expect(pe.importTable).toBeUndefined();
        });
      });

      describe('Entry point', () => {
        it('Then does not set property: "entryPoint"', () => {
          expect(pe.entryPoint).toBeUndefined();
        });

        it('Then does not set property: "entryPointOpCode"', () => {
          expect(pe.entryPointOpCode).toBeUndefined();
        });

        it('Then does not set property: "entryPointRva"', () => {
          expect(pe.entryPointVa).toBeUndefined();
        });
      });

      describe('Import Address Table Entry point', () => {
        it('Then does not set property: "iatEntryPoint"', () => {
          expect(pe.iatEntryPointRva).toBeUndefined();
        });
      });

      describe('Managed Entry point', () => {
        it('Then does not set property: "managedEntryPoint"', () => {
          expect(pe.managedEntryPoint).toBeUndefined();
        });
      });
    });
  });
});
