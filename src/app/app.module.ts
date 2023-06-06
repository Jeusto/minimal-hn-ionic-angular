import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { BrowserService } from './services/browser.service';
import { ShareService } from './services/share.service';
import { StorageService } from './services/storage.service';
import { ToastService } from './services/toast.service';
import { StoriesEffects } from './stores/stories/stories.effects';
import { storiesReducer } from './stores/stories/stories.reducer';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ stories: storiesReducer }),
    EffectsModule.forRoot([StoriesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    ToastService,
    BrowserService,
    StorageService,
    ShareService,
    ApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
