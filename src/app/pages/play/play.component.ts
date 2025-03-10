import { Component, inject, input, OnInit, signal } from '@angular/core'
import { ServerService } from '../../services/server.service'
import { PlayerService } from '../../services/player.service'
import { Router, RouterLink } from '@angular/router'
import { RoomService } from '../../services/room.service'
import { Message, Room } from '../../types/room'

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent implements OnInit {
  id = input.required<string>()
  playerService = inject(PlayerService)
  serverService = inject(ServerService)
  roomService = inject(RoomService)
  router = inject(Router)
  roomData = signal<Room | null>(null)
  message = signal<Message>({
    author: this.playerService.name(),
    content: ''
  })

  async ngOnInit(): Promise<void> {
    if (!this.id()) {
      try {
        // First try to find a public room
        const res = await this.serverService.findPublicRoom();
        if (res.success && res.room) {
          console.log('Found public room: ', res.room.id);
          await this.router.navigate(['/play', res.room.id]);
          return
        }

        // If no public room found, create a new one
        const newRoom = await this.serverService.createRoom({
          userName: this.playerService.name(),
          pub: true
        });
        console.log('Created new room: ', newRoom.room.id);
        await this.router.navigate(['/play', newRoom.room.id])
      } catch (error) {
        console.error('Failed to find or create room:', error)
      }
      return
    }

    try {
      const joinResult = await this.serverService.joinRoom({
        roomId: this.id(),
        userName: this.playerService.name()
      });
      console.log('Joined room: ', joinResult.room.id)
      this.roomService.setRoomData(joinResult.room);
    } catch (error) {
      console.error('Failed to join room:', error)
    }
  }

  updateMessage(event: Event) {
    const input = event.target as HTMLInputElement;
    this.message.set({
      ...this.message(),
      content: input.value
    });
  }

  sendMessage() {
    if (!this.message().content.trim()) return;
    
    this.serverService.sendMessage({
      roomId: this.id(),
      message: this.message()
    });

    this.message.set({
      ...this.message(),
      content: ''
    });
  }
}
