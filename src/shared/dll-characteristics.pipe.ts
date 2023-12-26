import { PipeTransform, Pipe } from '@angular/core';
import { DllCharacteristicsType } from '../app/models/dll-characteristics-type.enum';
import { FlagEnumParser } from './flag-enum-parser';

@Pipe({
  name: 'dllCharacteristics',
  standalone: true
})
export class DllCharacteristicsPipe implements PipeTransform {
  displayNames: Map<DllCharacteristicsType, string>;

  constructor() {
    this.displayNames = new Map<DllCharacteristicsType, string>();
    this.displayNames.set(DllCharacteristicsType.ProcessInit, 'Reserved');
    this.displayNames.set(DllCharacteristicsType.ProcessTerm, 'Reserved');
    this.displayNames.set(DllCharacteristicsType.ThreadInit, 'Reserved');
    this.displayNames.set(DllCharacteristicsType.ThreadTerm, 'Reserved');
    this.displayNames.set(DllCharacteristicsType.HighEntropyVirtualAddressSpace, 'IMAGE_DLLCHARACTERISTICS_HIGH_ENTROPY_VA');
    this.displayNames.set(DllCharacteristicsType.DynamicBase, ' IMAGE_DLLCHARACTERISTICS_DYNAMIC_BASE');
    this.displayNames.set(DllCharacteristicsType.ForceIntegrity, ' IMAGE_DLLCHARACTERISTICS_FORCE_INTEGRITY');
    this.displayNames.set(DllCharacteristicsType.NxCompatible, ' IMAGE_DLLCHARACTERISTICS_NX_COMPAT');
    this.displayNames.set(DllCharacteristicsType.NoIsolation, 'IMAGE_DLLCHARACTERISTICS_NO_ISOLATION');
    this.displayNames.set(DllCharacteristicsType.NoSeh, 'IMAGE_DLLCHARACTERISTICS_NO_SEH');
    this.displayNames.set(DllCharacteristicsType.NoBind, 'IMAGE_DLLCHARACTERISTICS_NO_BIND');
    this.displayNames.set(DllCharacteristicsType.AppContainer, 'IMAGE_DLLCHARACTERISTICS_APPCONTAINER');
    this.displayNames.set(DllCharacteristicsType.WdmDriver, 'IMAGE_DLLCHARACTERISTICS_WDM_DRIVER');
    this.displayNames.set(DllCharacteristicsType.ControlFlowGuard, 'IMAGE_DLLCHARACTERISTICS_GUARD_CF');
    this.displayNames.set(DllCharacteristicsType.TerminalServerAware, 'IMAGE_DLLCHARACTERISTICS_TERMINAL_SERVER_AWARE');
  }

  transform(value: number): string[] {
    return FlagEnumParser.getNames<DllCharacteristicsType>(value, this.displayNames);
  }
}
