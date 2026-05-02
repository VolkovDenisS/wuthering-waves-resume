import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GameAccount {
  title: string;
  uid: string;
  region: string;
  tone: string;
}

@Component({
  selector: 'app-games',
  imports: [CommonModule],
  templateUrl: './games.html',
  styleUrl: './games.scss',
})
export class Games {
  nickname = 'Joske';
  copiedUid: string | null = null;
  private copyResetTimer: ReturnType<typeof setTimeout> | null = null;

  accounts: GameAccount[] = [
    {
      title: 'Wuthering Waves',
      uid: '602819194',
      region: 'Solaris-3',
      tone: 'ww',
    },
    {
      title: 'Honkai: Star Rail',
      uid: '700123541',
      region: 'Astral Express',
      tone: 'star',
    },
    {
      title: 'Zenless Zone Zero',
      uid: '1504895926',
      region: 'New Eridu',
      tone: 'zero',
    },
  ];

  copyUid(uid: string) {
    let feedbackShown = false;
    const showFeedback = () => {
      if (!feedbackShown) {
        this.markCopied(uid);
        feedbackShown = true;
      }
    };

    const copiedWithFallback = this.copyWithTextarea(uid);

    if (copiedWithFallback) {
      showFeedback();
    }

    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(uid).then(showFeedback).catch(() => undefined);
    }
  }

  private copyWithTextarea(value: string) {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);

    return copied;
  }

  private markCopied(uid: string) {
    this.copiedUid = uid;

    if (this.copyResetTimer) {
      clearTimeout(this.copyResetTimer);
    }

    this.copyResetTimer = setTimeout(() => {
      this.copiedUid = null;
      this.copyResetTimer = null;
    }, 1400);
  }
}
