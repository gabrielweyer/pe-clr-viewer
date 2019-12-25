import { Component, EventEmitter, Output } from '@angular/core';
import { PortableExecutableReader } from '../../shared/portable-executable-reader.service';
import { PortableExecutable } from '../models/portable-executable';

@Component({
  selector: 'app-upload-container',
  templateUrl: './upload-container.component.html',
  styleUrls: ['./upload-container.component.scss']
})
export class UploadContainerComponent {
  @Output() fileRead: EventEmitter<PortableExecutable> = new EventEmitter();

  public isReading = false;
  public pe: PortableExecutable;

  private readonly fileReader = new FileReader();

  constructor() {
    this.fileReader.onload = e => {
      this.onRead(this.fileReader.result as ArrayBuffer);
    };
  }

  public fileChanged(event: EventTarget): void {
    if (this.isReading) {
      return;
    }

    this.isReading = true;
    this.pe = undefined;

    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const files: FileList = target.files;
    const file = files[0];

    this.fileReader.readAsArrayBuffer(file);
  }

  private onRead(buffer: ArrayBuffer): void {
    const dataview = new DataView(buffer);
    const bytes = new Uint8Array(buffer);

    const peReader = new PortableExecutableReader(bytes);
    this.pe = peReader.read();

    if (this.pe) {
      this.fileRead.emit(this.pe);
    }

    this.isReading = false;
  }
}
