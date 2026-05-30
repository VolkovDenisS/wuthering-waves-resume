import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TransitionService } from '../../transition.service';
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

  private transition = inject(TransitionService);
  isStarting = false;
  loadingProgress = 0;
  loadingStatus = 'INITIALIZING...';

  private readonly statusMessages = [
    'CONNECTING...',
    'VERIFYING...',
    'DECRYPTING...',
    'CALIBRATING...',
    'STABILIZING...',
    'COMPLETE'
  ];

  constructor(private router: Router) {}

  ngAfterViewInit() {
    gsap.from(this.splashContainer.nativeElement, {
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  }

  startGame() {
    if (this.isStarting) return;
    this.isStarting = true;

    // Slower, more deliberate loading sequence (~2.5s total)
    let currentStep = 0;
    const totalSteps = this.statusMessages.length;
    
    const interval = setInterval(() => {
      if (currentStep < totalSteps) {
        this.loadingStatus = this.statusMessages[currentStep];
        this.loadingProgress = ((currentStep + 1) / totalSteps) * 100;
        currentStep++;
      } else {
        clearInterval(interval);
        this.triggerTransition();
      }
    }, 400);
  }

  private triggerTransition() {
    // Start global white flash and mark as entrance
    this.transition.start(true);

    // Give the overlay a moment to fade in before navigation
    setTimeout(() => {
      this.router.navigate(['/main']);
    }, 700);

    // Subtle scale/blur on splash while flashing
    gsap.to(this.splashContainer.nativeElement, {
      scale: 1.05,
      filter: 'blur(10px) brightness(1.2)',
      duration: 0.7,
      ease: 'power2.inOut'
    });
  }
}
