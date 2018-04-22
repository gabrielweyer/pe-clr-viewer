import { PortableExecutableGuard } from './../shared/portable-executable-guard.service';
import { CharacteristicsType } from './models/characteristics-type.enum';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BytePipe } from './../shared/byte.pipe';
import { LeftPadPipe } from './../shared/leftpad.pipe';
import { HexPipe } from './../shared/hex.pipe';
import { SubsystemPipe } from './../shared/subsystem-pipe';
import { CharacteristicsPipe } from './../shared/characteristics.pipe';
import { DllCharacteristicsType } from './models/dll-characteristics-type.enum';

import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './../shared/app.config';
import { LinkComponent } from './link/link.component';
import { SectionContainerComponent } from './section-container/section-container.component';
import { DllCharacteristicsPipe } from '../shared/dll-characteristics.pipe';
import { BytesContainerComponent } from './bytes-container/bytes-container.component';
import { ViewerComponent } from './viewer/viewer.component';
import { GuideContainerComponent } from './guide-container/guide-container.component';
import { DisclaimerContainerComponent } from './disclaimer-container/disclaimer-container.component';
import { UploadContainerComponent } from './upload-container/upload-container.component';
import { HeadersLegendComponent } from './headers-legend/headers-legend.component';
import { TextLegendComponent } from './text-legend/text-legend.component';
import { StoreService } from '../shared/store.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LegendTextComponent } from './legend-text/legend-text.component';
import { LegendHeadersComponent } from './legend-headers/legend-headers.component';

@NgModule({
  declarations: [
    AppComponent,
    BytePipe,
    LeftPadPipe,
    HexPipe,
    LinkComponent,
    SubsystemPipe,
    SectionContainerComponent,
    CharacteristicsPipe,
    DllCharacteristicsPipe,
    BytesContainerComponent,
    ViewerComponent,
    GuideContainerComponent,
    DisclaimerContainerComponent,
    UploadContainerComponent,
    TextLegendComponent,
    PageNotFoundComponent,
    HomeComponent,
    LegendTextComponent,
    LegendHeadersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true },
    StoreService,
    PortableExecutableGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
