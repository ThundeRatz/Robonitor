import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@IonicPage()
@Component({
  selector: 'page-strategies',
  templateUrl: 'strategies.html',
})
export class StrategiesPage {
  bt_connection: any;
  mac: string;
  strategies: Array<{name: string, n: number}>;

  devices: Array<{name: string, mac: string}>;

  constructor(public navCtrl: NavController, private bt: BluetoothSerial, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.bt.enable().then(() => {
      console.log("BT enabled!");
    }, () => {
      console.log("BT not enabled");
    });

    this.bt.subscribe('\n').subscribe((data) => {
      console.log("Received: " + data);
    })

    this.strategies = [];
    for (let i = 1; i <= 24; i++) {
      this.strategies.push(
        { name: String(i), n: i }
      );
    }

    this.devices = [
      { name: "Pepita (Amped Up)", mac: "00:80:E1:B7:EE:F0" },
      { name: "HC-06",             mac: "30:14:08:26:01:17" },
      { name: "HC06-MarcoW",       mac: "20:16:05:19:17:79" }
    ];
  }

  show_devices(): void {
    // this.bt.list().then((list) => {
      // console.log("Listing");
      // console.log(list);

      let alert = this.alertCtrl.create();
      alert.setTitle('BTs dos Robôs');

      for (var dev of this.devices) {
        alert.addInput({
          type: 'radio',
          label: dev.name,
          value: dev.mac
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

    // }, (err) => {
    //   this.toastCtrl.create({
    //     message: 'Falha em listar dispositivos',
    //     duration: 3000
    //   }).present();
    // })
  }

  connect(): void {
    if (this.bt.isConnected()) {
      // console.log("Connected");
      this.disconnect();
    }

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
  }

  disconnect(): void {
    this.bt.disconnect();
  }

  b(n: number): void {
    let s = [ n ];
    this.bt.write(s).then(() => {
      console.log("BT ok");
    }, (err) => {
      console.log(err);
    });
  }
}
