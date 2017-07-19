import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as nipplejs from 'nipplejs';

/**
 * Generated class for the JoystickPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-joystick',
  templateUrl: 'joystick.html',
})
export class JoystickPage {
  @ViewChild('zoneJoystick') zoneJoystick: ElementRef;
  joystick: any;
  pos_x: number;
  pos_y: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.joystick = nipplejs.create({
      zone: this.zoneJoystick.nativeElement,
      mode: 'static',
      position: {
        left: '50vw',
        top:  '50vw'
      },
      size: 200,
      color: '#132C5A',
      threshold: 1
    })

    this.joystick.on('move', (evt, data) => {
      this.pos_x = Math.floor(data.position.x - data.instance.position.x);
      this.pos_y = Math.floor(data.instance.position.y - data.position.y);
    }).on('end', (evt, instance) => {
      this.pos_x = 0;
      this.pos_y = 0;
    });
  }
}
