export class FlagEnumParser {
  static getNames<T>(value: number, displayNames: Map<T, string>): string[] {
    const characteristics: string[] = new Array<string>();

    for (const type of Array.from(displayNames.keys())) {
      const maskValue = Number(type);

      if ((value & maskValue) === maskValue) {
        characteristics.push(displayNames.get(type));
      }
    }

    return characteristics;
  }
}
