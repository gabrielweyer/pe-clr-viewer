import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BytePipe } from './byte.pipe';
import { LeftPadPipe } from './leftpad.pipe';
import { HexPipe } from './hex.pipe';

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
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
