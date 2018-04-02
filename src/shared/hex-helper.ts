export class HexHelper {
  public static getDecimal(hexValue: string): number {
    return Number.parseInt(hexValue, 16);
  }
}
