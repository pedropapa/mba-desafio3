import io from 'socket.io-client';

export class SocketService {
  private socket: any;

  public connect(ip: string, opts: object = null) {
    let socket = io(ip, opts);
    console.log(socket);

    if(socket) {
      this.socket = socket;
      return socket;
    }

    return false;
  }
}
