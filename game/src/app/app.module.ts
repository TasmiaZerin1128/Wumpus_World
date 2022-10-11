import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { SettingsComponent } from './settings/settings.component';
import { PlayComponent } from './play/play.component';


import { BrowserAnimationsModule } from
        '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }
        from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    SettingsComponent,
    PlayComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
