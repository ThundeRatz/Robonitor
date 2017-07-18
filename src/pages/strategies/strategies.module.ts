import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StrategiesPage } from './strategies';

@NgModule({
  declarations: [
    StrategiesPage,
  ],
  imports: [
    IonicPageModule.forChild(StrategiesPage),
  ],
  exports: [
    StrategiesPage
  ]
})
export class StrategiesPageModule {}
