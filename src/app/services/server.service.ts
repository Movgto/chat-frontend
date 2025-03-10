import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'
import { CreateRoomArgs, CreateRoomResponse } from '../types/createRoom';
import { JoinRoomArgs } from '../types/joinRoom';
import { Room, Message, SendMessageArgs } from '../types/room';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  server = io('localhost:3000', { autoConnect: false })
  roomSubject = new Subject<Room>()

  constructor() {
    this.server.on('connect', () => {
      console.log('Connected to the backend')
    })

    this.server.on('syncRoom', res => {
      console.log(res)
      this.roomSubject.next(res as Room)
    })
    this.server.connect()
    this.server.emit('custom message')
  }

  findPublicRoom(): Promise<Pick<CreateRoomResponse, 'room'|'success'>> {
    return this.server.emitWithAck('findPublicRoom')
  }

  createRoom(args: CreateRoomArgs): Promise<CreateRoomResponse> {
    return this.server.emitWithAck('createRoom', args)
  }

  joinRoom(args: JoinRoomArgs): Promise<CreateRoomResponse> {
    return this.server.emitWithAck('joinRoom', args)
  }

  sendMessage(args: SendMessageArgs) {
    return this.server.emit('sendMessage', args)
  }
}
