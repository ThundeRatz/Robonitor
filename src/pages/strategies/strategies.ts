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
  devices: Array<any>;

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
    for (let i = 1; i <= 22; i++) {
      this.strategies.push(
        { name: "Estrategia " + String(i), n: i }
      );
    }

    // this.strategies = [
    //   { name: "Estratégia 1",  n:  1 },
    //   { name: "Estratégia 2",  n:  2 },
    //   { name: "Estratégia 3",  n:  3 },
    //   { name: "Estratégia 4",  n:  4 },
    //   { name: "Estratégia 5",  n:  5 },
    //   { name: "Estratégia 6",  n:  6 },
    //   { name: "Estratégia 7",  n:  7 },
    //   { name: "Estratégia 8",  n:  8 },
    //   { name: "Estratégia 9",  n:  9 },
    //   { name: "Estratégia 10", n: 10 },
    //   { name: "Estratégia 11", n: 11 },
    //   { name: "Estratégia 12", n: 12 },
    //   { name: "Estratégia 13", n: 13 },
    //   { name: "Estratégia 14", n: 14 },
    //   { name: "Estratégia 15", n: 15 },
    //   { name: "Estratégia 16", n: 16 },
    //   { name: "Estratégia 17", n: 17 },
    //   { name: "Estratégia 18", n: 18 },
    //   { name: "Estratégia 19", n: 19 },
    //   { name: "Estratégia 20", n: 20 },
    //   { name: "Estratégia 21", n: 21 },
    //   { name: "Estratégia 22", n: 22 }
    // ];

  }

  show_devices(): void {
    this.bt.list().then((list) => {
      console.log("Listing");
      console.log(list);

      let alert = this.alertCtrl.create();
      alert.setTitle('Dispositivos Pareados');

      for (var dev of list) {
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

  connect(): void {
    if (this.bt.isConnected()) {
      console.log("Connected");
      // this.disconnect();
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
    })
  }
}
