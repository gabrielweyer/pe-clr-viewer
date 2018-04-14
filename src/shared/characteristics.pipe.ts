import { PipeTransform, Pipe } from '@angular/core';
import { CharacteristicsType } from '../app/models/characteristics-type.enum';
import { FlagEnumParser } from './flag-enum-parser';

@Pipe({ name: 'characteristics' })
export class CharacteristicsPipe implements PipeTransform {
  displayNames: Map<CharacteristicsType, string>;

  constructor() {
    this.displayNames = new Map<CharacteristicsType, string>();
    this.displayNames.set(CharacteristicsType.RelocsStripped, 'IMAGE_FILE_RELOCS_STRIPPED');
    this.displayNames.set(CharacteristicsType.ExecutableImage, 'IMAGE_FILE_EXECUTABLE_IMAGE');
    this.displayNames.set(CharacteristicsType.LineNumsStripped, 'IMAGE_FILE_LINE_NUMS_STRIPPED');
    this.displayNames.set(CharacteristicsType.LocalSymsStripped, 'IMAGE_FILE_LOCAL_SYMS_STRIPPED');
    this.displayNames.set(CharacteristicsType.AggressiveWSTrim, 'IMAGE_FILE_AGGRESSIVE_WS_TRIM');
    this.displayNames.set(CharacteristicsType.LargeAddressAware, 'IMAGE_FILE_LARGE_ADDRESS_AWARE');
    this.displayNames.set(CharacteristicsType.ReservedForFutureUse, 'Reserved for future use');
    this.displayNames.set(CharacteristicsType.BytesReversedLo, 'IMAGE_FILE_BYTES_REVERSED_LO');
    this.displayNames.set(CharacteristicsType.Bit32Machine, 'IMAGE_FILE_32BIT_MACHINE');
    this.displayNames.set(CharacteristicsType.DebugStripped, 'IMAGE_FILE_DEBUG_STRIPPED');
    this.displayNames.set(CharacteristicsType.RemovableRunFromSwap, 'IMAGE_FILE_REMOVABLE_RUN_FROM_SWAP');
    this.displayNames.set(CharacteristicsType.NetRunFromSwap, 'IMAGE_FILE_NET_RUN_FROM_SWAP');
    this.displayNames.set(CharacteristicsType.System, 'IMAGE_FILE_SYSTEM');
    this.displayNames.set(CharacteristicsType.Dll, 'IMAGE_FILE_DLL');
    this.displayNames.set(CharacteristicsType.UpSystemOnly, 'IMAGE_FILE_UP_SYSTEM_ONLY');
    this.displayNames.set(CharacteristicsType.BytesReversedHi, 'IMAGE_FILE_BYTES_REVERSED_HI');
  }

  transform(value: number): string {
    return FlagEnumParser.getNames<CharacteristicsType>(value, this.displayNames).join(', ');
  }
}
