import { Component, EventEmitter, Output } from '@angular/core';
import { PortableExecutableReader } from '../../shared/portable-executable-reader.service';
import { PortableExecutable } from '../models/portable-executable';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-upload-container',
  templateUrl: './upload-container.component.html',
  styleUrl: './upload-container.component.scss',
  imports: [NgClass]
})
export class UploadContainerComponent {
  @Output() fileRead: EventEmitter<PortableExecutable> = new EventEmitter<PortableExecutable>();

  public isReading = false;
  public hasError = false;
  public pe: PortableExecutable | undefined;

  private readonly fileReader = new FileReader();

  constructor() {
    this.fileReader.onload = _e => {
      this.onRead(this.fileReader.result as ArrayBuffer);
    };
  }

  public fileChanged(event: Event): void {
    if (this.isReading) {
      return;
    }

    this.isReading = true;
    this.hasError = false;
    this.pe = undefined;

    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      const file = files[0];

      this.fileReader.readAsArrayBuffer(file);
    }
  }

  private onRead(buffer: ArrayBuffer): void {
    const bytes = new Uint8Array(buffer);

    const peReader = new PortableExecutableReader(bytes);

    // eslint-disable no-unused-vars
    try {
      this.pe = peReader.read();
    } catch (_e) {
      this.hasError = true;
      this.pe = undefined;
    }
    // eslint-enable no-unused-vars

    this.fileRead.emit(this.pe);

    this.isReading = false;
  }
}
