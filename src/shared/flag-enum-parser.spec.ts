import { FlagEnumParser } from './flag-enum-parser';

enum TestEnum {
  FirstValue = 1,
  SecondValue = 2,
  ThirdValue = 4,
  FourthValue = 8,
}

const displayNames: Map<TestEnum, string> = new Map<TestEnum, string>();
displayNames.set(TestEnum.FirstValue, 'First Value');
displayNames.set(TestEnum.SecondValue, 'Second Value');
displayNames.set(TestEnum.ThirdValue, 'Third Value');
displayNames.set(TestEnum.FourthValue, 'Fourth Value');

describe('FlagEnumParser', () => {
  describe('Given bitmask', () => {
    describe('When getNames', () => {
      const actual = FlagEnumParser.getNames<TestEnum>(11, displayNames);

      it ('Return the expected flags', () => {
        expect(actual).toEqual(['First Value', 'Second Value', 'Fourth Value']);
      });
    });
  });
});
