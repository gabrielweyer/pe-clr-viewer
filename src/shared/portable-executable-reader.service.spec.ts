import { PortableExecutableReader } from './portable-executable-reader.service';

describe('PortableExecutableReader', () => {
  describe('Given file is not an executable', () => {
    const nonExecutableFile: number[] = [90, 77, 144, 0];
    const bytes = new Uint8Array(nonExecutableFile);
    const target = new PortableExecutableReader(bytes);

    describe('When read', () => {
      const pe = target.read();

      it('Then returns "null"', () => {
        expect(pe).toBeNull();
      });
    });
  });
});
