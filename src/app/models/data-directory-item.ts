import { RvaSegment, HexSegment } from './segment';

export class DataDirectoryItem {
  constructor(public readonly rva: RvaSegment, public readonly size: HexSegment) {}
}
