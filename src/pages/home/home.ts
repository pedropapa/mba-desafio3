import {Component} from "@angular/core";
import {ToastController} from "ionic-angular";
import {SocketService} from "../../services/socket.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public toastCtrl: ToastController) {
    let socketService = new SocketService();
    let socket = socketService.connect('http://localhost:3000/mbchat');
    let self = this;

    socket.on('connect', () => {
      self.toastMessage("Conectado.");
    });

    socket.on('disconnect', () => {
      self.toastMessage("Desconectado.");
    });

    // if (socket.connected) {
    //   this.toastMessage("Conectado!.");
    // } else {
    //   this.toastMessage("Não foi possível connectar ao servidor.");
    // }
  }

  toastMessage = (message: string) => {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

}
