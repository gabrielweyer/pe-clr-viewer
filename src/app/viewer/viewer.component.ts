import { HexHelper } from './../../shared/hex-helper';
import { PortableExecutable } from './../models/portable-executable';
import { Component, computed, inject } from '@angular/core';
import { Byte } from '../models/byte';
import { StoreService } from '../../shared/store.service';
import { VaConvertorComponent } from '../va-convertor/va-convertor.component';
import { LegendHeadersComponent } from '../legend-headers/legend-headers.component';

import { BytesContainerComponent } from '../bytes-container/bytes-container.component';

export interface PortableExecutableView {
  pe: PortableExecutable;

  bytes: Byte[];
  startOffsetDec: number;

  cliMetadataHeaderBytes: Byte[];
  cliMetadataHeaderStartOffsetDec: number;

  importTableEntryPointBytes: Byte[];
  importTableEntryPointStartOffsetDec: number;
}

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss',
  imports: [BytesContainerComponent, LegendHeadersComponent, VaConvertorComponent]
})
export class ViewerComponent {
  private readonly store = inject(StoreService);

  public readonly view = computed(() => {
    const pe = this.store.portableExecutable();

    return pe === undefined ? undefined : ViewerComponent.toView(pe);
  });

  private static toView(pe: PortableExecutable): PortableExecutableView {
    const startOffsetDec = 0;

    let cliMetadataHeaderBytes: Byte[] = [];
    let cliMetadataHeaderStartOffsetDec = 0;
    let importTableEntryPointBytes: Byte[] = [];
    let importTableEntryPointStartOffsetDec = 0;

    let endOffsetDec = pe.relocSectionHeader.endOffsetDec + 48 - 1;

    if (pe.isManaged && pe.cliHeader && pe.cliMetadataHeader && pe.clrVersion) {
      endOffsetDec = pe.cliHeader.endOffsetDec + 48;

      cliMetadataHeaderStartOffsetDec = HexHelper.getNiceEndOffsetDec(pe.cliMetadataHeader.startOffsetDec - 48);
      const cliMetadataHeaderEndOffsetDec = HexHelper.getNiceEndOffsetDec(pe.clrVersion.endOffsetDec + 48);
      cliMetadataHeaderBytes = pe.hexes.slice(cliMetadataHeaderStartOffsetDec, cliMetadataHeaderEndOffsetDec);

      if (!pe.is64Bit && pe.importTable && pe.entryPoint) {
        importTableEntryPointStartOffsetDec = HexHelper.getNiceEndOffsetDec(pe.importTable.startOffsetDec - 48);
        const importTableEntryPointEndOffsetDec = HexHelper.getNiceEndOffsetDec(pe.entryPoint.endOffsetDec + 48);
        importTableEntryPointBytes = pe.hexes.slice(importTableEntryPointStartOffsetDec, importTableEntryPointEndOffsetDec);
      }
    }

    const bytes = pe.hexes.slice(startOffsetDec, HexHelper.getNiceEndOffsetDec(endOffsetDec));

    return {
      pe,
      bytes,
      startOffsetDec,
      cliMetadataHeaderBytes,
      cliMetadataHeaderStartOffsetDec,
      importTableEntryPointBytes,
      importTableEntryPointStartOffsetDec
    };
  }
}
