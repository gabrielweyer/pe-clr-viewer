import { Segment } from "./segment";

export class DataDirectoryItem {
  constructor(
    public readonly rvaSegment: Segment,
    public readonly rvaHex: string,
    public readonly sizeSegment: Segment,
    public readonly sizeHex: string) {
  }
}
