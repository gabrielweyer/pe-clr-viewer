import { Component, EventEmitter, Output } from '@angular/core';
import { PortableExecutableReader } from '../../shared/portable-executable-reader.service';
import { PortableExecutable } from '../models/portable-executable';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-upload-container',
  templateUrl: './upload-container.component.html',
  styleUrl: './upload-container.component.scss',
  standalone: true,
  imports: [NgClass, NgIf]
})
export class UploadContainerComponent {
  @Output() fileRead: EventEmitter<PortableExecutable> = new EventEmitter();

  public isReading = false;
  public hasError = false;
  public pe: PortableExecutable | undefined;

  private readonly fileReader = new FileReader();

  constructor() {
    this.fileReader.onload = e => {
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

    try {
      this.pe = peReader.read();
    } catch (error) {
      this.hasError = true;
      this.pe = undefined;
    }

    this.fileRead.emit(this.pe);

    this.isReading = false;
  }
}
