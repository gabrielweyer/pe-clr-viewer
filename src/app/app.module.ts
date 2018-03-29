import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BytePipe } from './byte.pipe';
import { LeftPadPipe } from './leftpad.pipe';
import { HexPipe } from './hex.pipe';

import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';

@NgModule({
  declarations: [
    AppComponent,
    BytePipe,
    LeftPadPipe,
    HexPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
