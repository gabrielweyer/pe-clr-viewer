import { PortableExecutableConstants } from './../models/portable-executable-constants';
import { Component, Input } from '@angular/core';
import { PortableExecutable } from '../models/portable-executable';
import { DllCharacteristicsPipe } from '../../shared/dll-characteristics.pipe';
import { CharacteristicsPipe } from '../../shared/characteristics.pipe';
import { SubsystemPipe } from '../../shared/subsystem-pipe';
import { HexPipe } from '../../shared/hex.pipe';
import { LeftPadPipe } from '../../shared/leftpad.pipe';
import { BytePipe } from '../../shared/byte.pipe';
import { NgIf } from '@angular/common';
import { FlagsFormatterComponent } from '../flags-formatter/flags-formatter.component';
import { LinkComponent } from '../link/link.component';
import { SectionContainerComponent } from '../section-container/section-container.component';

@Component({
  selector: 'app-legend-headers',
  templateUrl: './legend-headers.component.html',
  styleUrl: './legend-headers.component.scss',
  standalone: true,
  imports: [SectionContainerComponent, LinkComponent, FlagsFormatterComponent, NgIf, BytePipe, LeftPadPipe, HexPipe, SubsystemPipe, CharacteristicsPipe, DllCharacteristicsPipe]
})
export class LegendHeadersComponent {
  @Input() pe!: PortableExecutable;

  peConstants = PortableExecutableConstants;
}
