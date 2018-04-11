import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BytePipe } from './../shared/byte.pipe';
import { LeftPadPipe } from './../shared/leftpad.pipe';
import { HexPipe } from './../shared/hex.pipe';
import { SubsystemPipe } from './../shared/subsystem-pipe';

import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './../shared/app.config';
import { LinkComponent } from './link/link.component';

@NgModule({
  declarations: [AppComponent, BytePipe, LeftPadPipe, HexPipe, LinkComponent, SubsystemPipe],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
