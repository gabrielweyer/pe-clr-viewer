import { HexPipe } from './hex.pipe';

describe('HexPipe', () => {
  const pipe = new HexPipe();

  describe('Given leading zeros "000000AE"', () => {
    const hex = '000000AE';

    describe('When transform', () => {
      const actualFormattedHex = pipe.transform(hex);

      it('Then truncate leading zeros', () => {
        // Assert
        expect(actualFormattedHex).toEndWith('xAE');
      });

      it('Then prefix with "0x"', () => {
        // Assert
        expect(actualFormattedHex).toStartWith('0x');
      });
    });
  });
});
