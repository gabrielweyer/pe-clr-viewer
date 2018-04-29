import { StringHelper } from './string-helper';
import { TrimmedString } from '../app/models/trimmed-string';
describe('StringHelper', () => {
  describe('trimStartEndNullChars', () => {
    describe('Given string without Null chars', () => {
      const value = 'v4.0.30319';

      it('Then same string', () => {
        const actual = StringHelper.trimStartEndNullChars(value);

        const expected = new TrimmedString(actual.value, 0, 0);

        expect(actual).toEqual(expected);
      });
    });

    describe('Given string with start Null chars', () => {
      const value = '\0\0v4.0.30319';

      it('Then trim', () => {
        const actual = StringHelper.trimStartEndNullChars(value);

        const expected = new TrimmedString('v4.0.30319', 2, 0);

        expect(actual).toEqual(expected);
      });
    });

    describe('Given string with end Null chars', () => {
      const value = 'v4.0.30319\0\0\0';

      it('Then trim', () => {
        const actual = StringHelper.trimStartEndNullChars(value);

        const expected = new TrimmedString('v4.0.30319', 0, 3);

        expect(actual).toEqual(expected);
      });
    });

    describe('Given string with both start and end Null chars', () => {
      const value = '\0\0v4.0.30319\0\0\0';

      it('Then trim', () => {
        const actual = StringHelper.trimStartEndNullChars(value);

        const expected = new TrimmedString('v4.0.30319', 2, 3);

        expect(actual).toEqual(expected);
      });
    });

    describe('Given string with both start and end Null chars', () => {
      const value = '\0\0v4.0\0.30319\0\0\0';

      it('Then trim start and end but preserve middle', () => {
        const actual = StringHelper.trimStartEndNullChars(value);

        const expected = new TrimmedString('v4.0\0.30319', 2, 3);

        expect(actual).toEqual(expected);
      });
    });
  });
});
