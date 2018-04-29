import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { RvaSegment } from './../models/segment';
import { HexHelper } from './../../shared/hex-helper';
import { by } from 'protractor';
import { PortableExecutable } from './../models/portable-executable';
import { Component, Input, OnDestroy } from '@angular/core';
import { PortableExecutableConstants } from '../models/portable-executable-constants';
import { Byte } from '../models/byte';
import { StoreService } from '../../shared/store.service';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnDestroy {
  public pe: PortableExecutable;

  public bytes: Byte[];
  public startOffsetDec = 0;
  public endOffsetDec: number;

  public cliMetadataHeaderBytes: Byte[];
  public cliMetadataHeaderStartOffsetDec: number;

  public importTableEntryPointBytes: Byte[];
  public importTableEntryPointStartOffsetDec: number;

  public peConstants = PortableExecutableConstants;

  private readonly navigationSubscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: StoreService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
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
    this.pe = this.store.getPortableExecutable();
    this.setBytes();
  }

  private setBytes(): void {
    this.bytes = undefined;

    this.startOffsetDec = 0;

    let endOffsetDec = this.pe.relocSectionHeader.endOffsetDec + 48 - 1;

    if (this.pe.isManaged) {
      endOffsetDec = this.pe.cliHeader.endOffsetDec + 48;

      this.cliMetadataHeaderStartOffsetDec = HexHelper.getNiceEndOffsetDec(
        this.pe.cliMetadataHeader.startOffsetDec - 48
      );
      const cliMetadataHeaderEndOffsetDec = HexHelper.getNiceEndOffsetDec(this.pe.clrVersion.endOffsetDec + 48);
      this.cliMetadataHeaderBytes = this.pe.hexes.slice(
        this.cliMetadataHeaderStartOffsetDec,
        cliMetadataHeaderEndOffsetDec
      );

      if (!this.pe.is64Bit) {
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
