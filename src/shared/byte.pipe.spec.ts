import { BytePipe } from './byte.pipe';

describe('BytePipe', () => {
  const pipe = new BytePipe();

  describe('Given decimal number "12"', () => {
    const number = 12;

    describe('When transform', () => {
      const actualHex = pipe.transform(number);

      it('Then uppercase hexadecimal "C"', () => {
        expect(actualHex).toBe('C');
      });
    });
  });
});
