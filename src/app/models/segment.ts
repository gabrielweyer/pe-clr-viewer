export class Segment {
  constructor(
    public readonly startOffsetDec: number,
    public readonly endOffsetDec: number,
    public readonly sizeDec: number
  ) {}
}

export class HexSegment extends Segment {
  constructor(
    public readonly startOffsetDec: number,
    public readonly endOffsetDec: number,
    public readonly sizeDec: number,
    public readonly hexValue: string
  ) {
    super(startOffsetDec, sizeDec, endOffsetDec);
  }
}

export class FileOffsetSegment extends Segment {
  constructor(
    public readonly startOffsetDec: number,
    public readonly endOffsetDec: number,
    public readonly sizeDec: number,
    public readonly fileOffset: string
  ) {
    super(startOffsetDec, sizeDec, endOffsetDec);
  }
}

export class RvaSegment extends Segment {
  constructor(
    public readonly startOffsetDec: number,
    public readonly endOffsetDec: number,
    public readonly sizeDec: number,
    public readonly rva: string
  ) {
    super(startOffsetDec, sizeDec, endOffsetDec);
  }
}
