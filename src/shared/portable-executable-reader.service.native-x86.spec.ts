import { SectionItem } from './../app/models/section-item';
import { DataDirectoryItem } from './../app/models/data-directory-item';
import { FileOffsetSegment, Segment, HexSegment, RvaSegment } from './../app/models/segment';
import { PortableExecutablePart } from './../app/models/portable-executable-part.enum';
import { PortableExecutableReader } from './portable-executable-reader.service';
import { Native_x86 } from '../../tests-data/native-x86';

describe('PortableExecutableReader', () => {
  describe('Given native x86', () => {
    const bytes = new Uint8Array(Native_x86);
    const target = new PortableExecutableReader(bytes);

    const expectedSignatureStartOffsetHex = '000000F8';
    const expectedSignatureStartOffsetDec = 248;
    const expectedSectionHeaderSizeDec = 40;
    const expectedCliHeaderSizeHex = '00000000';
    const expectedCliHeaderSizeDec = 0;
    const expectedTextSectionFileOffsetHex = '00000400';
    const expectedTextSectionFileOffsetDec = 512;
    const expectedImportAddressTableDirectorySizeHex = '00000214';
    const expectedImportAddressTableDirectorySizeDec = 532;

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
            expect(element.isDosHeader).toBeTruthy(offset);
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
              expect(element.isSignatureOffset).toBeTruthy(offset);
            });
          });
        });
      });

      describe('DOS stub', () => {
        const expectedStartOffset = 64;
        const expectedEndOffset = 247;
        const expectedSizeDec = 183;

        it('Then set property: "dosStub"', () => {
          const expected = new Segment(expectedStartOffset, expectedEndOffset, expectedSizeDec);

          expect(pe.dosStub).toEqual(expected);
        });

        it('Then set DOS stub hexes', () => {
          const dosStub = pe.hexes.slice(expectedStartOffset, expectedEndOffset);

          dosStub.forEach((element, offset) => {
            expect(element.isDosStub).toBeTruthy(offset);
          });
        });
      });

      describe('Signature', () => {
        const expectedEndOffsetDec = 251;
        const expectedSizeDec = 4;

        it('Then set property: "signature"', () => {
          const expected = new Segment(expectedSignatureStartOffsetDec, expectedEndOffsetDec, expectedSizeDec);

          expect(pe.signature).toEqual(expected);
        });

        it('Then set signature hexes', () => {
          const signature = pe.hexes.slice(expectedSignatureStartOffsetDec, expectedEndOffsetDec);

          signature.forEach((element, offset) => {
            expect(element.isSignature).toBeTruthy(offset);
          });
        });
      });

      describe('COFF header', () => {
        const expectedStartOffsetDec = 252;
        const expectedEndOffsetDec = 271;
        const expectedSizeDec = 20;

        it('Then set property: "coffHeader"', () => {
          const expected = new Segment(expectedStartOffsetDec, expectedEndOffsetDec, expectedSizeDec);

          expect(pe.coffHeader).toEqual(expected);
        });

        it('Then set COFF header hexes', () => {
          const coffHeader = pe.hexes.slice(expectedStartOffsetDec, expectedEndOffsetDec);

          coffHeader.forEach((element, offset) => {
            expect(element.isCoffHeader).toBeTruthy(offset);
          });
        });
      });

      describe('Standard fields', () => {
        const expectedStartOffsetDec = 272;
        const expectedEndOffsetDec = 299;
        const expectedSizeDec = 28;

        it('Then set property: "standardFields" (28 bytes as x86)', () => {
          const expected = new Segment(expectedStartOffsetDec, expectedEndOffsetDec, expectedSizeDec);

          expect(pe.standardFields).toEqual(expected);
        });

        it('Then set standard fields hexes', () => {
          const standardFields = pe.hexes.slice(expectedStartOffsetDec, expectedEndOffsetDec);

          standardFields.forEach((element, offset) => {
            expect(element.isStandardFields).toBeTruthy(offset);
          });
        });

        describe('Magic number (bitness)', () => {
          const expectedSubStartOffsetDec = 272;
          const expectedSubEndOffsetDec = 273;
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
              expect(element.isMagicNumber).toBeTruthy(offset);
            });
          });
        });

        describe('Address of entry point', () => {
          const expectedSubStartOffsetDec = 288;
          const expectedSubEndOffsetDec = 291;
          const expectedSubSizeDec = 4;

          it('Then set property: "addressOfEntryPoint"', () => {
            const expected = new RvaSegment(
              expectedSubStartOffsetDec,
              expectedSubEndOffsetDec,
              expectedSubSizeDec,
              '00004C6E'
            );

            expect(pe.addressOfEntryPoint).toEqual(expected);
          });

          it('Then set address of entry point hexes', () => {
            const addressOfEntryPoint = pe.hexes.slice(expectedSubStartOffsetDec, expectedSubEndOffsetDec);

            addressOfEntryPoint.forEach((element, offset) => {
              expect(element.isAddressOfEntryPoint).toBeTruthy(offset);
            });
          });
        });
      });

      describe('NT specific fields', () => {
        const expectedStartOffsetDec = 300;
        const expectedEndOffsetDec = 367;
        const expectedSizeDec = 68;

        it('Then set property: "ntSpecificFields" (68 bytes as x86)', () => {
          const expected = new Segment(expectedStartOffsetDec, expectedEndOffsetDec, expectedSizeDec);

          expect(pe.ntSpecificFields).toEqual(expected);
        });

        it('Then set NT specific fields hexes', () => {
          const ntSpecificFields = pe.hexes.slice(expectedStartOffsetDec, expectedEndOffsetDec);

          ntSpecificFields.forEach((element, offset) => {
            expect(element.isNtSpecificFields).toBeTruthy(offset);
          });
        });

        describe('ImageBase', () => {
          const expectedSubStartOffsetDec = 300;
          const expectedSubEndOffsetDec = 303;
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
              expect(element.isImageBase).toBeTruthy(offset);
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
            expect(element.isDataDirectories).toBeTruthy(offset);
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
              '0002CA84'
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
              expect(element.isImportTableDirectoryRva).toBeTruthy(offset);
            });
          });

          it('Then set import table directory size hexes', () => {
            const size = pe.hexes.slice(expectedHexStartOffsetDec, expectedHexEndOffsetDec);

            size.forEach((element, offset) => {
              expect(element.isImportTableDirectorySize).toBeTruthy(offset);
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
              '00022000'
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
              expect(element.isImportTableDirectoryRva).toBeTruthy(offset);
            });
          });

          it('Then set import address table directory size hexes', () => {
            const size = pe.hexes.slice(expectedHexStartOffsetDec, expectedHexEndOffsetDec);

            size.forEach((element, offset) => {
              expect(element.isImportTableDirectorySize).toBeTruthy(offset);
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
              expect(element.isImportTableDirectoryRva).toBeTruthy(offset);
            });
          });

          it('Then set cli header directory size hexes', () => {
            const size = pe.hexes.slice(expectedHexStartOffsetDec, expectedHexEndOffsetDec);

            size.forEach((element, offset) => {
              expect(element.isImportTableDirectorySize).toBeTruthy(offset);
            });
          });

          it('Then set property: "cliHeaderDirectory" to "false"', () => {
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
            expect(element.isTextSectionHeader).toBeTruthy(offset);
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
            expect(element.isTextBaseRva).toBeTruthy(offset);
          });
        });

        it('Then set .text section header file offset hexes', () => {
          const fileOffset = pe.hexes.slice(expectedFileOffsetStartOffsetDec, expectedFileOffsetEndOffsetDec);

          fileOffset.forEach((element, offset) => {
            expect(element.isTextFileOffset).toBeTruthy(offset);
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
            expect(element.isRsrcSectionHeader).toBeTruthy(offset);
          });
        });

        it('Then set property: "rsrcSectionItem"', () => {
          const expectedBaseRva = new RvaSegment(
            expectedBaseRvaStartOffsetDec,
            expectedBaseRvaEndOffsetDec,
            4,
            '00022000'
          );
          const expectedFileOffset = new FileOffsetSegment(
            expectedFileOffsetStartOffsetDec,
            expectedFileOffsetEndOffsetDec,
            4,
            '00020800'
          );
          const expected = new SectionItem(expectedBaseRva, expectedFileOffset);

          expect(pe.rsrcSectionItem).toEqual(expected);
        });

        it('Then set .rsrc section header base RVA hexes', () => {
          const baseRva = pe.hexes.slice(expectedBaseRvaStartOffsetDec, expectedBaseRvaEndOffsetDec);

          baseRva.forEach((element, offset) => {
            expect(element.isTextBaseRva).toBeTruthy(offset);
          });
        });

        it('Then set .rsrc section header file offset hexes', () => {
          const fileOffset = pe.hexes.slice(expectedFileOffsetStartOffsetDec, expectedFileOffsetEndOffsetDec);

          fileOffset.forEach((element, offset) => {
            expect(element.isTextFileOffset).toBeTruthy(offset);
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
            expect(element.isRsrcSectionHeader).toBeTruthy(offset);
          });
        });

        it('Then set property: "rsrcSectionItem"', () => {
          const expectedBaseRva = new RvaSegment(
            expectedBaseRvaStartOffsetDec,
            expectedBaseRvaEndOffsetDec,
            4,
            '0002E000'
          );
          const expectedFileOffset = new FileOffsetSegment(
            expectedFileOffsetStartOffsetDec,
            expectedFileOffsetEndOffsetDec,
            4,
            '0002C000'
          );
          const expected = new SectionItem(expectedBaseRva, expectedFileOffset);

          expect(pe.relocSectionItem).toEqual(expected);
        });

        it('Then set .reloc section header base RVA hexes', () => {
          const baseRva = pe.hexes.slice(expectedBaseRvaStartOffsetDec, expectedBaseRvaEndOffsetDec);

          baseRva.forEach((element, offset) => {
            expect(element.isTextBaseRva).toBeTruthy(offset);
          });
        });

        it('Then set .reloc section header file offset hexes', () => {
          const fileOffset = pe.hexes.slice(expectedFileOffsetStartOffsetDec, expectedFileOffsetEndOffsetDec);

          fileOffset.forEach((element, offset) => {
            expect(element.isTextFileOffset).toBeTruthy(offset);
          });
        });
      });

      describe('CLI header', () => {
        it('Then does not set property: "cliHeader"', () => {
          expect(pe.cliHeader).toBeUndefined();
        });

        it('Then does not set property: "cliFlags"', () => {
          expect(pe.cliFlags).toBeUndefined();
        });
      });
    });
  });
});
