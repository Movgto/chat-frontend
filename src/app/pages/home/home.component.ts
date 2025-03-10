import { Component, inject } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { RouterLink } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {  
  playerService = inject(PlayerService)
}
