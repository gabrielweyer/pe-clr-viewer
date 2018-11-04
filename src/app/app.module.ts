import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppConfigService } from '../shared/app.config';
import { DllCharacteristicsPipe } from '../shared/dll-characteristics.pipe';
import { StoreService } from '../shared/store.service';
import { BytePipe } from './../shared/byte.pipe';
import { CharacteristicsPipe } from './../shared/characteristics.pipe';
import { HexPipe } from './../shared/hex.pipe';
import { LeftPadPipe } from './../shared/leftpad.pipe';
import { PortableExecutableGuard } from './../shared/portable-executable-guard.service';
import { SubsystemPipe } from './../shared/subsystem-pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BytesContainerComponent } from './bytes-container/bytes-container.component';
import { DisclaimerContainerComponent } from './disclaimer-container/disclaimer-container.component';
import { FlagsFormatterComponent } from './flags-formatter/flags-formatter.component';
import { GuideContainerComponent } from './guide-container/guide-container.component';
import { HomeComponent } from './home/home.component';
import { LegendHeadersComponent } from './legend-headers/legend-headers.component';
import { LinkComponent } from './link/link.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SectionContainerComponent } from './section-container/section-container.component';
import { UploadContainerComponent } from './upload-container/upload-container.component';
import { VaConvertorComponent } from './va-convertor/va-convertor.component';
import { ViewerComponent } from './viewer/viewer.component';

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
    PageNotFoundComponent,
    HomeComponent,
    LegendHeadersComponent,
    VaConvertorComponent,
    FlagsFormatterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AppConfigService,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfigService) => () => config.load(), deps: [AppConfigService], multi: true },
    StoreService,
    PortableExecutableGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
