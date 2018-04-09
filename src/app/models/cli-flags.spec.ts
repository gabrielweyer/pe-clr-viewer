import { CliFlags } from './cli-flags';
describe('CliFlags', () => {
  describe('Given flags contain "1"', () => {
    const flags = '00000001';
    const actual = getCliFlags(flags);

    it('Then set "isIlOnly" to "true"', () => {
      expect(actual.isIlOnly).toBeTruthy();
    });
  });

  describe('Given flags contain "2"', () => {
    const flags = '00000002';
    const actual = getCliFlags(flags);

    it('Then set "is32BitRequired" to "true"', () => {
      expect(actual.is32BitRequired).toBeTruthy();
    });
  });

  describe('Given flags contain both "1" and "2"', () => {
    const flags = '00000003';
    const actual = getCliFlags(flags);

    it('Then set "isIlOnly" to "true"', () => {
      expect(actual.isIlOnly).toBeTruthy();
    });

    it('Then set "is32BitRequired" to "true"', () => {
      expect(actual.is32BitRequired).toBeTruthy();
    });
  });

  describe('Given flags contain "8"', () => {
    const flags = '00000008';
    const actual = getCliFlags(flags);

    it('Then set "isStrongNamed" to "true"', () => {
      expect(actual.isStrongNamed).toBeTruthy();
    });
  });
});

function getCliFlags(flags: string): CliFlags {
  return new CliFlags(0, 3, 4, flags);
}


