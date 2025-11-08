export class FlagEnumParser {
  static getNames<T>(value: number, displayNames: Map<T, string>): string[] {
    const names: string[] = new Array<string>();

    for (const type of Array.from(displayNames.keys())) {
      const maskValue = Number(type);

      if ((value & maskValue) === maskValue) {
        const displayName = displayNames.get(type);
        if (displayName) {
          names.push(displayName);
        }
      }
    }

    return names;
  }
}
