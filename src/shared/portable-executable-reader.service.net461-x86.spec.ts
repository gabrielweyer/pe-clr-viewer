import { SectionItem } from './../app/models/section-item';
import { DataDirectoryItem } from './../app/models/data-directory-item';
import { FileOffsetSegment, Segment, HexSegment, RvaSegment } from './../app/models/segment';
import { PortableExecutablePart } from './../app/models/portable-executable-part.enum';
import { PortableExecutableReader } from './portable-executable-reader.service';
import { Net461_x86 } from '../../tests-data/net461-x86';
import { CliFlags } from '../app/models/cli-flags';
import { Subsystem } from '../app/models/subsystem';
import { SubsystemType } from '../app/models/subsystem-type.enum';
import { Characteristics } from '../app/models/characteristics';

describe('PortableExecutableReader', () => {
  describe('Given net461 x86', () => {
    const bytes = new Uint8Array(Net461_x86);
    const target = new PortableExecutableReader(bytes);

    const expectedSignatureStartOffsetHex = '00000080';
    const expectedSignatureStartOffsetDec = 128;
    const expectedSectionHeaderSizeDec = 40;
    const expectedCliHeaderSizeHex = '00000048';
    const expectedCliHeaderSizeDec = 72;
    const expectedTextSectionFileOffsetHex = '00000200';
    const expectedImportAddressTableDirectorySizeHex = '00000008';

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
        const expectedEndOffset = 127;
        const expectedSizeDec = 63;

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
        const expectedEndOffsetDec = 131;
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
        const expectedStartOffsetDec = 132;
        const expectedEndOffsetDec = 151;
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
          const expectedSubStartOffsetDec = 150;
          const expectedSubEndOffsetDec = 151;
          const expectedSubSizeDec = 2;

          it('Then set property: "characteristics"', () => {
            const expected = new Characteristics(
              expectedSubStartOffsetDec,
              expectedSubEndOffsetDec,
              expectedSubSizeDec,
              '0102'
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
        const expectedStartOffsetDec = 152;
        const expectedEndOffsetDec = 179;
        const expectedSizeDec = 28;

        it('Then set property: "standardFields" (28 bytes as x86)', () => {
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
          const expectedSubStartOffsetDec = 152;
          const expectedSubEndOffsetDec = 153;
          const expectedSubSizeDec = 2;

          it('Then set property: "magicNumber" to "010B" (x86)', () => {
            const expected = new HexSegment(
              expectedSubStartOffsetDec,
              expectedSubEndOffsetDec,
              expectedSubSizeDec,
              '010B'
            );

            expect(pe.magicNumber).toEqual(expected);
          });

          it('Then set property: "is64Bit" to "false"', () => {
            expect(pe.is64Bit).toBeFalsy();
          });

          it('Then set magic number hexes', () => {
            const magicNumber = pe.hexes.slice(expectedSubStartOffsetDec, expectedSubEndOffsetDec);

            magicNumber.forEach((element, offset) => {
              expect(element.isMagicNumber()).toBeTruthy(offset);
            });
          });
        });

        describe('Address of entry point', () => {
          const expectedSubStartOffsetDec = 168;
          const expectedSubEndOffsetDec = 171;
          const expectedSubSizeDec = 4;

          it('Then set property: "addressOfEntryPoint"', () => {
            const expected = new RvaSegment(
              expectedSubStartOffsetDec,
              expectedSubEndOffsetDec,
              expectedSubSizeDec,
              '00002716'
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
        const expectedStartOffsetDec = 180;
        const expectedEndOffsetDec = 247;
        const expectedSizeDec = 68;

        it('Then set property: "ntSpecificFields" (68 bytes as x86)', () => {
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
          const expectedSubStartOffsetDec = 180;
          const expectedSubEndOffsetDec = 183;
          const expectedSubSizeDec = 4;

          it('Then set property: "imageBase"', () => {
            const expected = new HexSegment(
              expectedSubStartOffsetDec,
              expectedSubEndOffsetDec,
              expectedSubSizeDec,
              '00400000'
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
          const expectedSubStartOffsetDec = 220;
          const expectedSubEndOffsetDec = 221;
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
      });

      describe('data directories fields', () => {
        const expectedStartOffsetDec = 248;
        const expectedEndOffsetDec = 375;
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
          const expectedRvaStartOffsetDec = 256;
          const expectedRvaEndOffsetDec = 259;
          const expectedHexStartOffsetDec = 260;
          const expectedHexEndOffsetDec = 263;

          it('Then set property: "importTableDirectory"', () => {
            const expectedRva = new RvaSegment(
              expectedRvaStartOffsetDec,
              expectedRvaEndOffsetDec,
              expectedSubSubSizeDec,
              '000026C4'
            );
            const expectedHex = new HexSegment(
              expectedHexStartOffsetDec,
              expectedHexEndOffsetDec,
              expectedSubSubSizeDec,
              '0000004F'
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
          const expectedRvaStartOffsetDec = 344;
          const expectedRvaEndOffsetDec = 347;
          const expectedHexStartOffsetDec = 348;
          const expectedHexEndOffsetDec = 351;

          it('Then set property: "importAddressTableDirectory"', () => {
            const expectedRva = new RvaSegment(
              expectedRvaStartOffsetDec,
              expectedRvaEndOffsetDec,
              expectedSubSubSizeDec,
              '00002000'
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
          const expectedRvaStartOffsetDec = 360;
          const expectedRvaEndOffsetDec = 363;
          const expectedHexStartOffsetDec = 364;
          const expectedHexEndOffsetDec = 367;

          it('Then set property: "cliHeaderDirectory"', () => {
            const expectedRva = new RvaSegment(
              expectedRvaStartOffsetDec,
              expectedRvaEndOffsetDec,
              expectedSubSubSizeDec,
              '00002008'
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

          it('Then set property: "isManaged" to "true"', () => {
            expect(pe.isManaged).toBeTruthy();
          });
        });
      });

      describe('.text section header', () => {
        const expectedStartOffsetDec = 376;
        const expectedEndOffsetDec = 415;
        const expectedBaseRvaStartOffsetDec = 388;
        const expectedBaseRvaEndOffsetDec = 391;
        const expectedFileOffsetStartOffsetDec = 396;
        const expectedFileOffsetEndOffsetDec = 399;

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
            '00002000'
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
        const expectedStartOffsetDec = 416;
        const expectedEndOffsetDec = 455;
        const expectedBaseRvaStartOffsetDec = 428;
        const expectedBaseRvaEndOffsetDec = 431;
        const expectedFileOffsetStartOffsetDec = 436;
        const expectedFileOffsetEndOffsetDec = 439;

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
            '00004000'
          );
          const expectedFileOffset = new FileOffsetSegment(
            expectedFileOffsetStartOffsetDec,
            expectedFileOffsetEndOffsetDec,
            4,
            '00000A00'
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
        const expectedStartOffsetDec = 456;
        const expectedEndOffsetDec = 495;
        const expectedBaseRvaStartOffsetDec = 468;
        const expectedBaseRvaEndOffsetDec = 471;
        const expectedFileOffsetStartOffsetDec = 476;
        const expectedFileOffsetEndOffsetDec = 479;

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
            '00006000'
          );
          const expectedFileOffset = new FileOffsetSegment(
            expectedFileOffsetStartOffsetDec,
            expectedFileOffsetEndOffsetDec,
            4,
            '00001200'
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

      describe('CLI header', () => {
        const expectedStartOffsetDec = 520;
        const expectedEndOffsetDec = 591;
        const expectedSizeDec = expectedCliHeaderSizeDec;

        it('Then set property: "cliHeader"', () => {
          const expected = new Segment(expectedStartOffsetDec, expectedEndOffsetDec, expectedSizeDec);

          expect(pe.cliHeader).toEqual(expected);
        });

        it('Then set CLI header hexes', () => {
          const cliHeader = pe.hexes.slice(expectedStartOffsetDec, expectedEndOffsetDec);

          cliHeader.forEach((element, offset) => {
            expect(element.isCliHeader()).toBeTruthy(offset);
          });
        });

        it('Then set property: "cliFlags"', () => {
          const expected = new CliFlags(536, 539, 4, '00000003');

          expect(pe.cliFlags).toEqual(expected);
        });
      });
    });
  });
});
