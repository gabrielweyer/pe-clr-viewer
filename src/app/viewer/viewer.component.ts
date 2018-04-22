import { Tab } from './../models/tab.enum';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { RvaSegment } from './../models/segment';
import { HexHelper } from './../../shared/hex-helper';
import { by } from 'protractor';
import { PortableExecutable } from './../models/portable-executable';
import { Component, Input } from '@angular/core';
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
export class ViewerComponent {
  public pe: PortableExecutable;
  public selectedTab: Tab = Tab.Headers;

  public bytes: Byte[];
  public startOffsetDec = 0;
  public endOffsetDec: number;

  public peConstants = PortableExecutableConstants;
  public Tab = Tab;

  private readonly navigationSubscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: StoreService) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.initialise();
        }
      });
    }

  private initialise(): void {
    this.selectedTab = this.route.snapshot.paramMap.get('tab') as Tab;
    this.pe = this.store.getPortableExecutable();
    this.setBytes();
  }

  private setBytes(): void {
    this.bytes = undefined;

    if (this.selectedTab === Tab.Text) {
      this.startOffsetDec = HexHelper.getDecimal(this.pe.textSectionItem.fileOffset.fileOffset);

      const endOffsetDec = HexHelper.getDecimal(this.pe.rsrcSectionItem.fileOffset.fileOffset) - 1;
      this.endOffsetDec = HexHelper.GetNiceEndOffsetDec(endOffsetDec);
    } else {
      this.startOffsetDec = 0;

      const endOffsetDec = HexHelper.getDecimal(this.pe.textSectionItem.fileOffset.fileOffset) - 1;
      this.endOffsetDec = HexHelper.GetNiceEndOffsetDec(endOffsetDec);
    }

    this.bytes = this.pe.hexes.slice(this.startOffsetDec, this.endOffsetDec);
  }
}
