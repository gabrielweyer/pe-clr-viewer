export class TrimmedString {
  constructor(public readonly value: string, public readonly removedFromStart: number = 0, public readonly removedFromEnd: number = 0) {}
}
