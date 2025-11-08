import { Router, NavigationEnd } from '@angular/router';
import { HexHelper } from './../../shared/hex-helper';
import { PortableExecutable } from './../models/portable-executable';
import { Component, OnDestroy, inject } from '@angular/core';
import { PortableExecutableConstants } from '../models/portable-executable-constants';
import { Byte } from '../models/byte';
import { StoreService } from '../../shared/store.service';
import { Subscription } from 'rxjs';
import { VaConvertorComponent } from '../va-convertor/va-convertor.component';
import { LegendHeadersComponent } from '../legend-headers/legend-headers.component';
import { NgIf } from '@angular/common';
import { BytesContainerComponent } from '../bytes-container/bytes-container.component';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss',
  imports: [BytesContainerComponent, NgIf, LegendHeadersComponent, VaConvertorComponent]
})
export class ViewerComponent implements OnDestroy {
  private readonly router = inject(Router);
  private readonly store = inject(StoreService);

  public pe!: PortableExecutable;

  public bytes: Byte[] = [];
  public startOffsetDec = 0;
  public endOffsetDec = 0;

  public cliMetadataHeaderBytes: Byte[] = [];
  public cliMetadataHeaderStartOffsetDec = 0;

  public importTableEntryPointBytes: Byte[] = [];
  public importTableEntryPointStartOffsetDec = 0;

  public peConstants = PortableExecutableConstants;

  private readonly navigationSubscription: Subscription;

  constructor() {
    this.navigationSubscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.initialise();
      }
    });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  private initialise(): void {
    const pe = this.store.getPortableExecutable();
    this.setBytes(pe);
  }

  private setBytes(pe: PortableExecutable | undefined): void {
    this.bytes = [];
    this.startOffsetDec = 0;
    this.cliMetadataHeaderBytes = [];
    this.cliMetadataHeaderStartOffsetDec = 0;
    this.importTableEntryPointBytes = [];
    this.importTableEntryPointStartOffsetDec = 0;

    if (pe === undefined) {
      return;
    }

    this.pe = pe;

    let endOffsetDec = this.pe.relocSectionHeader.endOffsetDec + 48 - 1;

    if (this.pe.isManaged && this.pe.cliHeader && this.pe.cliMetadataHeader && this.pe.clrVersion) {
      endOffsetDec = this.pe.cliHeader.endOffsetDec + 48;

      this.cliMetadataHeaderStartOffsetDec = HexHelper.getNiceEndOffsetDec(
        this.pe.cliMetadataHeader.startOffsetDec - 48
      );
      const cliMetadataHeaderEndOffsetDec = HexHelper.getNiceEndOffsetDec(this.pe.clrVersion.endOffsetDec + 48);
      this.cliMetadataHeaderBytes = this.pe.hexes.slice(
        this.cliMetadataHeaderStartOffsetDec,
        cliMetadataHeaderEndOffsetDec
      );

      if (!this.pe.is64Bit && this.pe.importTable && this.pe.entryPoint) {
        this.importTableEntryPointStartOffsetDec = HexHelper.getNiceEndOffsetDec(
          this.pe.importTable.startOffsetDec - 48
        );
        const importTableEntryPointEndOffsetDec = HexHelper.getNiceEndOffsetDec(this.pe.entryPoint.endOffsetDec + 48);
        this.importTableEntryPointBytes = this.pe.hexes.slice(
          this.importTableEntryPointStartOffsetDec,
          importTableEntryPointEndOffsetDec
        );
      }
    }

    this.endOffsetDec = HexHelper.getNiceEndOffsetDec(endOffsetDec);

    this.bytes = this.pe.hexes.slice(this.startOffsetDec, this.endOffsetDec);
  }
}
