import { TrimmedString } from '../app/models/trimmed-string';

export class StringHelper {
  public static trimStartEndNullChars(asciiValue: string): TrimmedString {
    const lastIndex = asciiValue.length - 1;

    let lastNullIndex = 0;
    let firstNullIndex = lastIndex;

    while (asciiValue.charCodeAt(lastNullIndex) === 0 && lastNullIndex < asciiValue.length) {
      lastNullIndex++;
    }

    while (asciiValue.charCodeAt(firstNullIndex) === 0 && lastNullIndex > -1) {
      firstNullIndex--;
    }

    if (lastNullIndex === 0 && firstNullIndex === lastIndex) {
      return new TrimmedString('');
    }

    if (lastNullIndex >= firstNullIndex) {
      return new TrimmedString('');
    }

    if (firstNullIndex === lastIndex) {
      return new TrimmedString(asciiValue.substring(lastNullIndex), lastNullIndex);
    } else {
      return new TrimmedString(
        asciiValue.substring(lastNullIndex, firstNullIndex + 1),
        lastNullIndex,
        lastIndex - firstNullIndex
      );
    }
  }
}
