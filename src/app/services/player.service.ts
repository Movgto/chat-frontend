import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  name = signal(this.generateName())
  
  setName(name: string) {
    this.name.set(name)
  }

  private generateName() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
}
