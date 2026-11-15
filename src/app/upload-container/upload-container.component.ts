import { Component, signal, output } from '@angular/core';
import { PortableExecutableReader } from '../../shared/portable-executable-reader.service';
import { PortableExecutable } from '../models/portable-executable';


@Component({
  selector: 'app-upload-container',
  templateUrl: './upload-container.component.html',
  styleUrl: './upload-container.component.scss'
})
export class UploadContainerComponent {
  readonly fileRead = output<PortableExecutable | undefined>();

  // Signals, because they are updated from the FileReader callback, which does not trigger OnPush change detection
  public readonly isReading = signal(false);
  public readonly hasError = signal(false);

  private readonly fileReader = new FileReader();

  constructor() {
    this.fileReader.onload = _e => {
      this.onRead(this.fileReader.result as ArrayBuffer);
    };
  }

  public fileChanged(event: Event): void {
    if (this.isReading()) {
      return;
    }

    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      this.isReading.set(true);
      this.hasError.set(false);

      this.fileReader.readAsArrayBuffer(files[0]);
    }
  }

  private onRead(buffer: ArrayBuffer): void {
    const bytes = new Uint8Array(buffer);

    const peReader = new PortableExecutableReader(bytes);

    let pe: PortableExecutable | undefined;

    try {
      pe = peReader.read();
    } catch (_e) {
      this.hasError.set(true);
      pe = undefined;
    }

    this.fileRead.emit(pe);

    this.isReading.set(false);
  }
}
