import { PortableExecutableSubPart } from './portable-executable-sub-part.enum';
import { Segment } from './segment';

export class SubPartVisitor {
  constructor(public readonly segment: Segment | undefined, public readonly subPart: PortableExecutableSubPart) {}
}
