import { Byte } from './byte';
import { PortableExecutablePart } from './portable-executable-part.enum';
import { PortableExecutableSubPart } from './portable-executable-sub-part.enum';

describe('Byte', () => {
  describe('Given byte is DOS header', () => {
    const target = new Byte('0', PortableExecutablePart.DosHeader, PortableExecutableSubPart.None);

    describe('When "isDosHeader()"', () => {
      const actual = target.isDosHeader();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is DOS stub', () => {
    const target = new Byte('0', PortableExecutablePart.DosStub, PortableExecutableSubPart.None);

    describe('When "isDosStub()"', () => {
      const actual = target.isDosStub();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is signature offset', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.SignatureOffset);

    describe('When "isSignatureOffset()"', () => {
      const actual = target.isSignatureOffset();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is signature', () => {
    const target = new Byte('0', PortableExecutablePart.Signature, PortableExecutableSubPart.None);

    describe('When "isSignature()"', () => {
      const actual = target.isSignature();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is COFF header', () => {
    const target = new Byte('0', PortableExecutablePart.CoffHeader, PortableExecutableSubPart.None);

    describe('When "isCoffHeader()"', () => {
      const actual = target.isCoffHeader();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is standard fields', () => {
    const target = new Byte('0', PortableExecutablePart.StandardFields, PortableExecutableSubPart.None);

    describe('When "isStandardFields()"', () => {
      const actual = target.isStandardFields();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is magic number', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.MagicNumber);

    describe('When "isMagicNumber()"', () => {
      const actual = target.isMagicNumber();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is address of entry point', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.AddressOfEntryPoint);

    describe('When "isAddressOfEntryPoint()"', () => {
      const actual = target.isAddressOfEntryPoint();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is NT specific fields', () => {
    const target = new Byte('0', PortableExecutablePart.NtSpecificFields, PortableExecutableSubPart.None);

    describe('When "isNtSpecificFields()"', () => {
      const actual = target.isNtSpecificFields();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is image base', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.ImageBase);

    describe('When "isImageBase()"', () => {
      const actual = target.isImageBase();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is subsystem', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.Subsystem);

    describe('When "isSubsystem()"', () => {
      const actual = target.isSubsystem();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is data directories', () => {
    const target = new Byte('0', PortableExecutablePart.DataDirectories, PortableExecutableSubPart.None);

    describe('When "isDataDirectories()"', () => {
      const actual = target.isDataDirectories();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is import table directory size', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.ImportTableDirectorySize);

    describe('When "isImportTableDirectorySize()"', () => {
      const actual = target.isImportTableDirectorySize();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is import table directory RVA', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.ImportTableDirectoryRva);

    describe('When "isImportTableDirectoryRva()"', () => {
      const actual = target.isImportTableDirectoryRva();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is import address table directory size', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.ImportAddressTableDirectorySize);

    describe('When "isImportAddressTableDirectorySize()"', () => {
      const actual = target.isImportAddressTableDirectorySize();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is import address table directory RVA', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.ImportAddressTableDirectoryRva);

    describe('When "isImportAddressTableDirectoryRva()"', () => {
      const actual = target.isImportAddressTableDirectoryRva();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is CLI header directory size', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.CliHeaderDirectorySize);

    describe('When "isCliHeaderDirectorySize()"', () => {
      const actual = target.isCliHeaderDirectorySize();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is CLI header directory RVA', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.CliHeaderDirectoryRva);

    describe('When "isCliHeaderDirectoryRva()"', () => {
      const actual = target.isCliHeaderDirectoryRva();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is .text section header', () => {
    const target = new Byte('0', PortableExecutablePart.TextSectionHeader, PortableExecutableSubPart.None);

    describe('When "isTextSectionHeader()"', () => {
      const actual = target.isTextSectionHeader();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is .text base RVA', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.TextBaseRva);

    describe('When "isTextBaseRva()"', () => {
      const actual = target.isTextBaseRva();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is .text file offset', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.TextFileOffset);

    describe('When "isTextFileOffset()"', () => {
      const actual = target.isTextFileOffset();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is .rsrc section header', () => {
    const target = new Byte('0', PortableExecutablePart.RsrcSectionHeader, PortableExecutableSubPart.None);

    describe('When "isRsrcSectionHeader()"', () => {
      const actual = target.isRsrcSectionHeader();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is .rsrc base RVA', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.RsrcBaseRva);

    describe('When "isRsrcBaseRva()"', () => {
      const actual = target.isRsrcBaseRva();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is .rsrc file offset', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.RsrcFileOffset);

    describe('When "isRsrcFileOffset()"', () => {
      const actual = target.isRsrcFileOffset();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is .reloc section hader', () => {
    const target = new Byte('0', PortableExecutablePart.RelocSectionHeader, PortableExecutableSubPart.None);

    describe('When "isRelocSectionHeader()"', () => {
      const actual = target.isRelocSectionHeader();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is .reloc base RVA', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.RelocBaseRva);

    describe('When "isRelocBaseRva()"', () => {
      const actual = target.isRelocBaseRva();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is .reloc file offset', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.RelocFileOffset);

    describe('When "isRelocFileOffset()"', () => {
      const actual = target.isRelocFileOffset();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is CLI header', () => {
    const target = new Byte('0', PortableExecutablePart.CliHeader, PortableExecutableSubPart.None);

    describe('When "isCliHeader()"', () => {
      const actual = target.isCliHeader();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });

  describe('Given byte is CLI flag', () => {
    const target = new Byte('0', PortableExecutablePart.None, PortableExecutableSubPart.CliFlags);

    describe('When "isCliFlags()"', () => {
      const actual = target.isCliFlags();

      it('Then "true"', () => {
        expect(actual).toBeTruthy();
      });
    });
  });
});
