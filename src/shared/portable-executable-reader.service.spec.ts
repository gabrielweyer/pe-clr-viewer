import { PortableExecutableReader } from './portable-executable-reader.service';

describe('PortableExecutableReader', () => {
  describe('Given file is not a Portable Executable', () => {
    const nonExecutableFile: number[] = [90, 77, 144, 0];
    const bytes = new Uint8Array(nonExecutableFile);
    const target = new PortableExecutableReader(bytes);

    describe('When read', () => {
      let actualError: unknown;

      try {
        target.read();
      } catch (error) {
        actualError = error;
      }

      it('Then throws', () => {
        expect(actualError).not.toBeNull();
      });
    });
  });
});
