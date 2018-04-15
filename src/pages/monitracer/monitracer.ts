import { Component } from '@angular/core';
import { ViewController, IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

const CMD_ST = 200;
const CMD_IN = 201;

const CMD_KP = 0;
const CMD_KI = 1;
const CMD_KD = 2;
const CMD_LSPD = 3;
const CMD_RSPD = 4;

@IonicPage()
@Component({
  selector: 'page-monitracer',
  templateUrl: 'monitracer.html',
})
export class MonitracerPage {
  constants: FormGroup;
  mac: string;
  bt_connection: any;

  tempo: number = 0;
  reading: Uint8Array;
  index: number = 0;

  devices: Array<{name: string, address: string, id: string, class: number}>;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public formBuilder: FormBuilder, private bt: BluetoothSerial, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.bt.enable().then(() => {
      console.log("BT enabled!");
    }, (err) => {
      console.log("BT not enabled: ", err);
    });

    this.constants = formBuilder.group({
      kp0: [''],
      kp1: [''],
      kp2: [''],

      ki0: [''],
      ki1: [''],
      ki2: [''],

      kd0: [''],
      kd1: [''],
      kd2: [''],

      left_speed0: [''],
      left_speed1: [''],
      left_speed2: [''],

      right_speed0: [''],
      right_speed1: [''],
      right_speed2: [''],
    });

    this.devices = [
      { name: "Pepita Velho (Amped Up)", address: "00:80:E1:B7:EE:F0", id: "", class: 0 },
      { name: "HC-06",                   address: "30:14:08:26:01:17", id: "", class: 0 },
      { name: "HC06-MarcoW",             address: "20:16:05:19:17:79", id: "", class: 0 },
    ];
  }

  save() : void {
    if (this.constants.value['kp0'] != ""){
      let kp0: number = this.constants.value['kp0'];
      this.send([0XFF, CMD_KP, 0, kp0 >> 8, kp0 & 0xFF, 0xFE]);
      console.log(kp0);
    }

    if (this.constants.value['kp1'] != ""){
      let kp1: number = this.constants.value['kp1'];
      this.send([0XFF, CMD_KP, 1, kp1 >> 8, kp1 & 0xFF, 0xFE]);
      console.log(kp1);
    }

    if (this.constants.value['kp2'] != ""){
      let kp2: number = this.constants.value['kp2'];
      this.send([0XFF, CMD_KP, 2, kp2 >> 8, kp2 & 0xFF, 0xFE]);
      console.log(kp2);
    }

    if (this.constants.value['ki0'] != ""){
      let ki0: number = this.constants.value['ki0'];
      this.send([0XFF, CMD_KI, 0, ki0 >> 8, ki0 & 0xFF, 0xFE]);
      console.log(ki0);
    }

    if (this.constants.value['ki1'] != ""){
      let ki1: number = this.constants.value['ki1'];
      this.send([0XFF, CMD_KI, 1, ki1 >> 8, ki1 & 0xFF, 0xFE]);
      console.log(ki1);
    }

    if (this.constants.value['ki2'] != ""){
      let ki2: number = this.constants.value['ki2'];
      this.send([0XFF, CMD_KI, 2, ki2 >> 8, ki2 & 0xFF, 0xFE]);
      console.log(ki2);
    }

    if (this.constants.value['kd0'] != ""){
      let kd0: number = this.constants.value['kd0'];
      this.send([0XFF, CMD_KD, 0, kd0 >> 8, kd0 & 0xFF, 0xFE]);
      console.log(kd0);
    }

    if (this.constants.value['kd1'] != ""){
      let kd1: number = this.constants.value['kd1'];
      this.send([0XFF, CMD_KD, 1, kd1 >> 8, kd1 & 0xFF, 0xFE]);
      console.log(kd1);
    }

    if (this.constants.value['kd2'] != ""){
      let kd2: number = this.constants.value['kd2'];
      this.send([0XFF, CMD_KD, 2, kd2 >> 8, kd2 & 0xFF, 0xFE]);
      console.log(kd2);
    }

    if (this.constants.value['left_speed0'] != ""){
      let left_speed0: number = this.constants.value['left_speed0'];
      this.send([0xFF, CMD_LSPD, 0, left_speed0 >> 8, left_speed0 & 0xFF, 0xFE]);
      console.log(left_speed0);
    }

    if (this.constants.value['left_speed1'] != ""){
      let left_speed1: number = this.constants.value['left_speed1'];
      this.send([0xFF, CMD_LSPD, 1, left_speed1 >> 8, left_speed1 & 0xFF, 0xFE]);
      console.log(left_speed1);
    }

    if (this.constants.value['left_speed2'] != ""){
      let left_speed2: number = this.constants.value['left_speed2'];
      this.send([0xFF, CMD_LSPD, 2, left_speed2 >> 8, left_speed2 & 0xFF, 0xFE]);
      console.log(left_speed2);
    }

    if (this.constants.value['right_speed0'] != ""){
      let right_speed0: number = this.constants.value['right_speed0'];
      this.send([0xFF, CMD_RSPD, 0, right_speed0 >> 8, right_speed0 & 0xFF, 0xFE]);
      console.log(right_speed0);
    }

    if (this.constants.value['right_speed1'] != ""){
      let right_speed1: number = this.constants.value['right_speed1'];
      this.send([0xFF, CMD_RSPD, 1, right_speed1 >> 8, right_speed1 & 0xFF, 0xFE]);
      console.log(right_speed1);
    }

    if (this.constants.value['right_speed2'] != ""){
      let right_speed2: number = this.constants.value['right_speed2'];
      this.send([0xFF, CMD_RSPD, 2, right_speed2 >> 8, right_speed2 & 0xFF, 0xFE]);
      console.log(right_speed2);
    }
  }

  start() : void {
    console.log('Robot started.');
    this.send([0XFF, CMD_IN, CMD_IN, CMD_IN, 0Xfe]);
  }

  stop() : void {
    console.log('Robot stopped.');
    this.send([0XFF, CMD_ST, CMD_ST, CMD_ST, 0Xfe]);
  }


  show_devices() : void {
    this.bt.list().then((list) => {
      console.log("Listing");
      console.log(list);
      this.devices = this.devices.concat(list);

      let alert = this.alertCtrl.create();
      alert.setTitle('BTs dos Robôs');

      for (var dev of this.devices) {
        alert.addInput({
          type: 'radio',
          label: dev.name,
          value: dev.address
        });
      }

      alert.addButton('Cancel');
      alert.addButton({
        text: 'Conectar',
        handler: data => {
          this.mac = data;
          this.connect();
        }
      })

      alert.present();

    }, (err) => {
      this.toastCtrl.create({
        message: 'Falha em listar dispositivos',
        duration: 3000
      }).present();
    })
  }

  connect() : void {
    this.bt.isConnected().then(() => {
      // console.log("Connected");
      this.disconnect();
    });

    let loading = this.loadingCtrl.create({
      content: 'Conectando...'
    });

    loading.present();

    this.bt_connection = this.bt.connect(this.mac);
    this.bt_connection.subscribe(() => {
      loading.dismiss();
      this.toastCtrl.create({
        message: 'Conectado com Sucesso!',
        duration: 3000
      }).present();
    }, (err) => {
      loading.dismiss();
      this.toastCtrl.create({
        message: 'A conexao falhou!',
        duration: 3000
      }).present();
      console.log("Connection failed: ", err);
    });

    this.bt.subscribeRawData().subscribe((data) => {
      console.log(data);

      let b = new Uint8Array(data);

      b.forEach((byte) => {
        if (byte == 0xFF && this.index == 0) {
          this.reading = new Uint8Array(6);
          this.reading[this.index++] = 0xFF;
        } else if (byte == 0xFE && this.index == 5) {
          this.reading[this.index] = 0xFE;

          if (this.reading[1] == 190 && this.reading[2] == 0) {
            this.tempo = this.reading[3] << 8 | this.reading[4];
            console.log(this.tempo);

            this.toastCtrl.create({
              message: 'Volta concluída! Tempo Recebido!',
              duration: 3000
            }).present();
          }
          this.index = 0;
        } else if (this.index > 0 && this.index < 5) {
          this.reading[this.index++] = byte
        } else {
          this.index = 0;
        }

        console.log(this.reading);
      });
    }, (err) => {
      console.log(err);
    })
  }

  send(arr: number[]) {
    this.bt.write(arr).then(() => {
      console.log("Enviado: ", arr);
    }, (err) => {
      this.toastCtrl.create({
        message: 'Erro ao enviar comando!',
        duration: 3000
      }).present();
      console.log("Erro ao enviar: ", arr, err);
    })
  }

  disconnect(): void {
    this.bt.disconnect();
  }
}
