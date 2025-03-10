import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlayerService } from '../../services/player.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-name',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './change-name.component.html',
  styleUrl: './change-name.component.scss'
})
export class ChangeNameComponent implements OnInit {
  name = signal<string>('')
  playerService = inject(PlayerService)

  ngOnInit() {
    this.name.set(this.playerService.name())
  }

  updateName(event: Event) {
    this.name.set((event.target as HTMLInputElement).value)
  }

  changeName() {
    this.playerService.setName(this.name())
  }
}
