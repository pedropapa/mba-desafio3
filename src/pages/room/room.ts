import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {RoomService} from "../../services/room.service";
import {HomePage} from "../home/home";

/**
 * Generated class for the RoomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-room',
  templateUrl: 'room.html'
})
export class RoomPage {
  public events: Array<object> = [];
  public message: string;
  @ViewChild('chat') chat;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    console.log(navParams);
  }

  ionViewDidLoad() {
    if (!RoomService.socket.connected) {
      this.toastMessage("Não está conectado ao servidor!");
      return this.navCtrl.setRoot(HomePage);
    }

    RoomService.socket.on('event', event => {
      console.log('novo evento! ', event, this.navParams.data.username);
      if (event.username && event.username == this.navParams.data.username) {
        event.self = true;
      }

      this.events.push(event);

      if (this.chat && this.chat._scroll) {
        console.log(this.chat);
        setTimeout(() => (this.chat && this.chat.scrollToBottom()), 200);
      }
    })
  }

  logout = () => {
    RoomService.socket.disconnect();
    this.navCtrl.setRoot(HomePage);
  }

  public send = (message) => {
    RoomService.socket.emit('message', {message: message});
    this.message = '';
  }

  toastMessage = (message: string) => {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    }).present();
  }

}
