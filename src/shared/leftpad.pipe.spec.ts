import { LeftPadPipe } from './leftpad.pipe';

describe('LeftPadPipe', () => {
  const pipe = new LeftPadPipe();

  describe('Given input "1234" longer than desired length "3"', () => {
    const input = '1234';
    const desiredLength = 3;

    describe('When transform', () => {
      const actualOutput = pipe.transform(input, desiredLength);

      it('Output "1234" is the same than input "1234"', () => {
        expect(actualOutput).toBe(input);
      });
    });
  });

  describe('Given input "1234" same length than desired length "4"', () => {
    const input = '1234';
    const desiredLength = 4;

    describe('When transform', () => {
      const actualOutput = pipe.transform(input, desiredLength);

      it('Output "1234" is the same than input "1234"', () => {
        expect(actualOutput).toBe(input);
      });
    });
  });

  describe('Given input "1234" shorter than desired length "5"', () => {
    const input = '1234';
    const desiredLength = 5;

    describe('When transform', () => {
      const actualOutput = pipe.transform(input, desiredLength);

      it('Output "01234" has been left-padded with one zero', () => {
        expect(actualOutput).toBe('01234');
      });
    });
  });
});
