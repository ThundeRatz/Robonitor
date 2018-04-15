import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonitracerPage } from './monitracer';

@NgModule({
  declarations: [
    MonitracerPage,
  ],
  imports: [
    IonicPageModule.forChild(MonitracerPage),
  ],
  exports: [
    MonitracerPage
  ]
})
export class MonitracerPageModule {}
