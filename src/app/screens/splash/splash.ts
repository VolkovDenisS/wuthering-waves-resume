import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-splash',
  imports: [CommonModule],
  templateUrl: './splash.html',
  styleUrls: ['./splash.scss']
})
export class Splash implements AfterViewInit {
  @ViewChild('splashContainer') splashContainer!: ElementRef;
  @ViewChild('startText') startText!: ElementRef;
  @ViewChild('transitionOverlay') transitionOverlay!: ElementRef;

  isStarting = false;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // Initial fade in
    gsap.from(this.splashContainer.nativeElement, {
      opacity: 0.25,
      duration: 0.8,
      ease: 'power2.inOut'
    });
  }

  startGame() {
    if (this.isStarting) return;
    this.isStarting = true;

    const tl = gsap.timeline({
      onComplete: () => {
        this.router.navigate(['/main']);
      }
    });

    // Wuthering Waves style flash transition
    tl.to(this.startText.nativeElement, {
      opacity: 0,
      duration: 0.2
    })
    .to(this.transitionOverlay.nativeElement, {
      opacity: 1,
      duration: 0.8,
      ease: 'expo.inOut'
    });
  }
}
