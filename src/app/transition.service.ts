import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransitionService {
  readonly isActive = signal(false);
  readonly isEntrance = signal(false);

  start(isEntrance = false) {
    this.isActive.set(true);
    this.isEntrance.set(isEntrance);
  }

  finish() {
    this.isActive.set(false);
    this.isEntrance.set(false);
  }
}
