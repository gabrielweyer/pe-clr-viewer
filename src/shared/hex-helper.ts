export class HexHelper {
  public static getDecimal(hexValue: string): number {
    return Number.parseInt(hexValue, 16);
  }

  /**
   * This will compute the start of the next line so that
   * The last line always has 16 bytes
   */
  public static getNiceEndOffsetDec(endOffsetDec: number): number {
    const remainder = (endOffsetDec + 1) % 16;

    if (remainder !== 0) {
      endOffsetDec += 16 - remainder;
    }

    return endOffsetDec + 1;
  }
}
