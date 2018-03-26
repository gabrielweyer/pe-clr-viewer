import { Segment } from "./segment";

export class SectionItem {
  constructor(
    public readonly baseRvaSegment: Segment,
    public readonly baseRvaHex: string,
    public readonly fileOffsetSegment: Segment,
    public readonly fileOffsetHex: string) {}
}
