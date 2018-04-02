import { PortableExecutablePart } from './portable-executable-part.enum';
import { Segment } from './segment';

export class PartVisitor {
  constructor(public readonly segment: Segment, public readonly part: PortableExecutablePart) {}
}
