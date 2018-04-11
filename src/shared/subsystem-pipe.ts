import { PipeTransform, Pipe } from '@angular/core';
import { SubsystemType } from '../app/models/subsystem-type.enum';

@Pipe({ name: 'subsystem' })
export class SubsystemPipe implements PipeTransform {
  transform(value: SubsystemType): string {
    switch (value) {
      case SubsystemType.Native:
        return 'device drivers and native Windows processes';
      case SubsystemType.WindowsGui:
        return 'GUI application';
      case SubsystemType.WindowsCui:
        return 'console application';
      case SubsystemType.OS2Cui:
        return 'OS/2 console application';
      case SubsystemType.PosixCui:
        return 'Posix console application';
      case SubsystemType.NativeWindows:
        return 'native Win9x driver';
      case SubsystemType.WindowsCEGui:
        return 'Windows CE GUI application';
      case SubsystemType.EfiApplication:
        return 'Extensible Firmware Interface (EFI) application';
      case SubsystemType.EfiBootServiceDriver:
        return 'Extensible Firmware Interface (EFI) driver with boot services';
      case SubsystemType.EfiRuntimeDriver:
        return 'Extensible Firmware Interface (EFI) driver with run-time services';
      case SubsystemType.EfiRom:
        return 'EFI ROM image';
      case SubsystemType.Xbox:
        return 'XBOX application';
      case SubsystemType.WindowsBootApplication:
        return 'Windows boot application';
      default:
        return 'Unknown';
    }
  }
}
