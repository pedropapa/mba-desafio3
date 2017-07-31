import {Component} from "@angular/core";
import {NavController, ToastController} from "ionic-angular";
import {SocketService} from "../../services/socket.service";
import {RoomPage} from "../room/room";
import {RoomService} from "../../services/room.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public username: string = '';
  public socket: any;

  constructor(public toastCtrl: ToastController, public navCtrl: NavController) {
    // Fazemos a tentativa de login no HomePage ao invés do app.component porque assim permitimos novas tentativas de conexão caso a conexão com o servidor caia.
    let socketService = new SocketService();
    this.socket = RoomService.socket = socketService.connect('http://pedropapadopolis.com:3000/mbchat');
    let self = this;

    this.socket.on('connect', () => {
      self.toastMessage("Conectado ao servidor.");
    });

    this.socket.on('joined', () => {
      this.navCtrl.setRoot(RoomPage, {username: self.username});
    });

    this.socket.on('disconnect', () => {
      self.toastMessage("Desconectado.");
    });

    this.socket.on('failure', (data) => {
      self.toastMessage(data.message);
    });
  }

  joinConversation = (username) => {
    if(username.length) {
      this.socket.emit('join', {username: username});
    } else {
      this.toastMessage("Preencha o nome.");
    }
  };

  toastMessage = (message: string) => {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

}
