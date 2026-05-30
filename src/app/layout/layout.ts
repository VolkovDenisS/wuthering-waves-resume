import { Component, ElementRef, ViewChild, AfterViewInit, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { tsParticles } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';
import { TransitionService } from '../transition.service';
import gsap from 'gsap';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout implements AfterViewInit {
  @ViewChild('mainLayout') mainLayout!: ElementRef;
  @ViewChild('particlesContainer') particlesContainer!: ElementRef;
  @ViewChild('cornerTL') cornerTL!: ElementRef;
  @ViewChild('cornerBL') cornerBL!: ElementRef;

  private transition = inject(TransitionService);

  constructor(private zone: NgZone) {}

  async ngAfterViewInit() {
    // Only run entrance animation if we are coming from Splash (coordinated by TransitionService)
    if (this.transition.isEntrance()) {
      gsap.from(this.mainLayout.nativeElement, {
        filter: 'brightness(3) blur(15px)',
        duration: 1.2,
        ease: 'power2.out',
        onStart: () => {
          setTimeout(() => this.transition.finish(), 100);
        }
      });
    } else {
      // Immediate clear for internal navigation
      this.transition.finish();
    }

    await this.initParticles();
  }

  private async initParticles() {
    await loadSlim(tsParticles);
    await tsParticles.load('particlesContainer', {
      fullScreen: { enable: false },
      particles: {
        number: { value: 30, density: { enable: true, area: 800 } },
        color: { value: ['#f3c84f', '#00e5ff', '#ffffff'] },
        shape: { type: 'circle' },
        opacity: {
          value: { min: 0.1, max: 0.4 },
          animation: { enable: true, speed: 0.5, sync: false }
        },
        size: {
          value: { min: 1, max: 2 }
        },
        move: {
          enable: true,
          speed: 0.2,
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'out' }
        }
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'bubble' }
        },
        modes: {
          bubble: { size: 4, distance: 200, duration: 2, opacity: 0.8 }
        }
      },
      retina_detect: true
    });
  }

  onMouseMove(event: MouseEvent) {
    const { clientX, clientY } = event;
    const moveX = (clientX - window.innerWidth / 2) / 50;
    const moveY = (clientY - window.innerHeight / 2) / 50;

    gsap.to(this.cornerTL.nativeElement, {
      x: moveX,
      y: moveY,
      duration: 1,
      ease: 'power2.out'
    });

    gsap.to(this.cornerBL.nativeElement, {
      x: moveX,
      y: -moveY,
      duration: 1,
      ease: 'power2.out'
    });
  }
}
