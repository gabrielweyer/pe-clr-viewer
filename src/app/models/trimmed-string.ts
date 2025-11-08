export class TrimmedString {
  constructor(public readonly value: string, public readonly removedFromStart = 0, public readonly removedFromEnd = 0) {}
}
