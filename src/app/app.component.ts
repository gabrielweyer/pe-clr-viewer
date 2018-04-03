import { PortableExecutableConstants } from './models/portable-executable-constants';
import { PortableExecutableReader } from './../shared/portable-executable-reader.service';
import { Component } from '@angular/core';
import { PortableExecutablePart } from './models/portable-executable-part.enum';
import { PortableExecutableSubPart } from './models/portable-executable-sub-part.enum';
import { Byte } from './models/byte';
import { BytePipe } from './../shared/byte.pipe';
import { LeftPadPipe } from './../shared/leftpad.pipe';
import { DataDirectoryItem } from './models/data-directory-item';
import { SectionItem } from './models/section-item';
import { Segment } from './models/segment';
import { AppConfig } from './../shared/app.config';
import { PortableExecutable } from './models/portable-executable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private static readonly bytePipe = new BytePipe();
  private static readonly leftPadPipe = new LeftPadPipe();

  public isReading = false;
  public showGuide = false;
  public fileName: string;
  public build: string;
  public commit: string;

  public peConstants = PortableExecutableConstants;
  public pe: PortableExecutable;

  private readonly fileReader = new FileReader();

  constructor(private appConfig: AppConfig) {
    this.fileReader.onload = e => {
      this.onRead(this.fileReader.result);
    };

    this.build = appConfig.build;
    this.commit = appConfig.commit;
  }

  public fileChanged(event: EventTarget): void {
    if (this.isReading) {
      return;
    }

    this.isReading = true;

    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = target.files;
    const file = files[0];

    this.fileName = file.name;

    this.fileReader.readAsArrayBuffer(file);
  }

  private onRead(buffer: ArrayBuffer): void {
    const dataview = new DataView(buffer);
    const bytes = new Uint8Array(buffer);

    const peReader = new PortableExecutableReader(bytes);
    this.pe = peReader.read();

    this.isReading = false;
  }

  handleShowGuide() {
    this.showGuide = !this.showGuide;
  }
}
