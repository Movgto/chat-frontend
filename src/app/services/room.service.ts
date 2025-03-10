import { Injectable, inject, signal } from '@angular/core';
import { Room } from '../types/room';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  serverService = inject(ServerService)
  private roomData = signal<Room | null>(null)

  constructor() {
    this.serverService.roomSubject.subscribe(room => {
      this.setRoomData(room)
    })
  }

  setRoomData(room: Room) {
    this.roomData.set(room)
  }

  getRoomData() {
    return this.roomData()
  }
}
