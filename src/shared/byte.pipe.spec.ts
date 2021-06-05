import { BytePipe } from './byte.pipe';

describe('BytePipe', () => {
  const pipe = new BytePipe();

  describe('Given decimal number "12"', () => {
    const numberLiteral = 12;

    describe('When transform', () => {
      const actualHex = pipe.transform(numberLiteral);

      it('Then uppercase hexadecimal "C"', () => {
        expect(actualHex).toBe('C');
      });
    });
  });

  describe('Given lowercase string "4d"', () => {
    const stringLiteral = '4d';

    describe('When transform', () => {
      const actualHex = pipe.transform(stringLiteral);

      it('Then uppercase "4D"', () => {
        expect(actualHex).toBe('4D');
      });
    });
  });
});
