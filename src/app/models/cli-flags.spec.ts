import { CliFlags } from './cli-flags';
describe('CliFlags', () => {
  describe('Given bit mask does not contain any flag', () => {
    const hexFlags = '00000000';
    const actual = getCliFlags(hexFlags);

    it('Then set "ILOnly" to "false"', () => {
      expect(actual.ILOnly).toBeFalsy();
    });

    it('Then set "Requires32Bit" to "false"', () => {
      expect(actual.Requires32Bit).toBeFalsy();
    });

    it('Then set "ILLibrary" to "false"', () => {
      expect(actual.ILLibrary).toBeFalsy();
    });

    it('Then set "StrongNameSigned" to "false"', () => {
      expect(actual.StrongNameSigned).toBeFalsy();
    });

    it('Then set "NativeEntryPoint" to "false"', () => {
      expect(actual.NativeEntryPoint).toBeFalsy();
    });

    it('Then set "TrackDebugData" to "false"', () => {
      expect(actual.TrackDebugData).toBeFalsy();
    });

    it('Then set "Prefers32Bit" to "false"', () => {
      expect(actual.Prefers32Bit).toBeFalsy();
    });
  });

  describe('Given bit mask contain decimal "1"', () => {
    const hexFlags = '00000001';
    const actual = getCliFlags(hexFlags);

    it('Then set "ILOnly" to "true"', () => {
      expect(actual.ILOnly).toBeTruthy();
    });
  });

  describe('Given bit mask contain decimal "2"', () => {
    const hexFlags = '00000002';
    const actual = getCliFlags(hexFlags);

    it('Then set "Requires32Bit" to "true"', () => {
      expect(actual.Requires32Bit).toBeTruthy();
    });
  });

  describe('Given bit mask contain decimal "4"', () => {
    const hexFlags = '00000004';
    const actual = getCliFlags(hexFlags);

    it('Then set "ILLibrary" to "true"', () => {
      expect(actual.ILLibrary).toBeTruthy();
    });
  });

  describe('Given bit mask contain decimal "8"', () => {
    const hexFlags = '00000008';
    const actual = getCliFlags(hexFlags);

    it('Then set "StrongNameSigned" to "true"', () => {
      expect(actual.StrongNameSigned).toBeTruthy();
    });
  });

  describe('Given bit mask contain decimal "16"', () => {
    const hexFlags = '00000010';
    const actual = getCliFlags(hexFlags);

    it('Then set "NativeEntryPoint" to "true"', () => {
      expect(actual.NativeEntryPoint).toBeTruthy();
    });
  });

  describe('Given bit mask contain decimal "65536"', () => {
    const hexFlags = '00010000';
    const actual = getCliFlags(hexFlags);

    it('Then set "TrackDebugData" to "true"', () => {
      expect(actual.TrackDebugData).toBeTruthy();
    });
  });

  describe('Given bit mask contain decimal "131072"', () => {
    const hexFlags = '00020000';
    const actual = getCliFlags(hexFlags);

    it('Then set "Prefers32Bit" to "true"', () => {
      expect(actual.Prefers32Bit).toBeTruthy();
    });
  });

  describe('Given bit mask contain all flags', () => {
    const hexFlags = '0003001F';
    const actual = getCliFlags(hexFlags);

    it('Then set "ILOnly" to "true"', () => {
      expect(actual.ILOnly).toBeTruthy();
    });

    it('Then set "Requires32Bit" to "true"', () => {
      expect(actual.Requires32Bit).toBeTruthy();
    });

    it('Then set "ILLibrary" to "true"', () => {
      expect(actual.ILLibrary).toBeTruthy();
    });

    it('Then set "StrongNameSigned" to "true"', () => {
      expect(actual.StrongNameSigned).toBeTruthy();
    });

    it('Then set "NativeEntryPoint" to "true"', () => {
      expect(actual.NativeEntryPoint).toBeTruthy();
    });

    it('Then set "TrackDebugData" to "true"', () => {
      expect(actual.TrackDebugData).toBeTruthy();
    });

    it('Then set "Prefers32Bit" to "true"', () => {
      expect(actual.Prefers32Bit).toBeTruthy();
    });
  });
});

function getCliFlags(flags: string): CliFlags {
  return new CliFlags(0, 3, 4, flags);
}


