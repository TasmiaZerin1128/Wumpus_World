import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { SettingsComponent } from './settings/settings.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {path: '', component: StartComponent },
  {path: 'settings', component: SettingsComponent},
  {path: 'play', component: PlayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
