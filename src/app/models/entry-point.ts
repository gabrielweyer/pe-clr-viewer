import { AsciiSegment } from './segment';

export class EntryPoint {
  constructor(public readonly method: AsciiSegment, public readonly executable: AsciiSegment) {}
}
