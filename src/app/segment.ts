export class Segment {
  public readonly endOffsetDec: number;

  constructor(public readonly startOffsetDec: number, size: number) {
    this.startOffsetDec = startOffsetDec;
    this.endOffsetDec = this.getEndOffset(this.startOffsetDec, size);
  }

  private getEndOffset(startOffsetDec: number, size: number): number {
    return startOffsetDec + size - 1;
  }
}
