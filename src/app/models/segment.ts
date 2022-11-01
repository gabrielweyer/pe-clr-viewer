export class Segment {
  constructor(
    public readonly startOffsetDec: number,
    public readonly endOffsetDec: number,
    public readonly sizeDec: number
  ) {}
}

export class HexSegment extends Segment {
  constructor(
    startOffsetDec: number,
    endOffsetDec: number,
    sizeDec: number,
    public readonly hexValue: string
  ) {
    super(startOffsetDec, endOffsetDec, sizeDec);
  }
}

export class FileOffsetSegment extends Segment {
  constructor(
    startOffsetDec: number,
    endOffsetDec: number,
    sizeDec: number,
    public readonly fileOffset: string
  ) {
    super(startOffsetDec, endOffsetDec, sizeDec);
  }
}

export class RvaSegment extends Segment {
  constructor(
    startOffsetDec: number,
    endOffsetDec: number,
    sizeDec: number,
    public readonly rva: string
  ) {
    super(startOffsetDec, endOffsetDec, sizeDec);
  }
}

export class VaSegment extends Segment {
  constructor(
    startOffsetDec: number,
    endOffsetDec: number,
    sizeDec: number,
    public readonly va: string
  ) {
    super(startOffsetDec, endOffsetDec, sizeDec);
  }
}

export class AsciiSegment extends Segment {
  constructor(
    startOffsetDec: number,
    endOffsetDec: number,
    sizeDec: number,
    public readonly text: string
  ) {
    super(startOffsetDec, endOffsetDec, sizeDec);
  }
}
