import { RvaSegment, FileOffsetSegment } from './segment';

export class SectionItem {
  constructor(public readonly baseRva: RvaSegment, public readonly fileOffset: FileOffsetSegment) {}
}
