import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoystickPage } from './joystick';

@NgModule({
  declarations: [
    JoystickPage,
  ],
  imports: [
    IonicPageModule.forChild(JoystickPage),
  ],
  exports: [
    JoystickPage
  ]
})
export class JoystickPageModule {}
