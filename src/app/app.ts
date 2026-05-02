import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

type CursorMode = 'normal' | 'link' | 'text' | 'vertical' | 'horizontal' | 'working' | 'unavailable';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('frontend');
  protected readonly cursorX = signal(0);
  protected readonly cursorY = signal(0);
  protected readonly cursorMode = signal<CursorMode>('normal');
  protected readonly cursorVisible = signal(false);

  protected cursorAsset() {
    const mode = this.cursorMode();
    const extension = mode === 'vertical' || mode === 'horizontal' ? 'cur' : 'gif';

    return `/cursors/${mode}.${extension}`;
  }

  @HostListener('document:mousemove', ['$event'])
  protected moveCursor(event: MouseEvent) {
    const target = this.resolveCursorTarget(event);

    this.cursorX.set(event.clientX);
    this.cursorY.set(event.clientY);
    this.cursorVisible.set(true);
    this.cursorMode.set(this.detectCursorMode(event, target));
  }

  @HostListener('document:mousedown', ['$event'])
  protected pressCursor(event: MouseEvent) {
    const target = this.resolveCursorTarget(event);

    this.cursorMode.set(this.detectCursorMode(event, target));
  }

  @HostListener('document:mouseleave')
  protected hideCursor() {
    this.cursorVisible.set(false);
  }

  private resolveCursorTarget(event: MouseEvent): Element | null {
    const target = event.target instanceof Element ? event.target : null;
    const pointTarget = document.elementFromPoint(event.clientX, event.clientY);

    return pointTarget instanceof Element ? pointTarget : target;
  }

  private detectCursorMode(event: MouseEvent, target: Element | null): CursorMode {
    const scrollbarMode = this.detectScrollbarCursorMode(event, target);

    if (scrollbarMode) {
      return scrollbarMode;
    }

    if (!target) {
      return 'normal';
    }

    if (target.closest('button:disabled, [aria-disabled="true"], .cursor-not-allowed')) {
      return 'unavailable';
    }

    if (target.closest('.cursor-wait, .cursor-progress, .is-loading')) {
      return 'working';
    }

    if (target.closest('input, textarea, [contenteditable="true"]')) {
      return 'text';
    }

    if (target.closest('a, button, [role="button"], [tabindex], [routerLink], .cursor-pointer')) {
      return 'link';
    }

    return 'normal';
  }

  private detectScrollbarCursorMode(event: MouseEvent, target: Element | null): 'vertical' | 'horizontal' | null {
    const scrollElement = this.findScrollableElement(target);

    if (!scrollElement) {
      return this.detectViewportScrollbarMode(event);
    }

    const rect = scrollElement.getBoundingClientRect();
    const verticalScrollbarWidth = scrollElement.offsetWidth - scrollElement.clientWidth;
    const horizontalScrollbarHeight = scrollElement.offsetHeight - scrollElement.clientHeight;
    const inVerticalGutter = verticalScrollbarWidth > 0 && event.clientX >= rect.right - verticalScrollbarWidth;
    const inHorizontalGutter = horizontalScrollbarHeight > 0 && event.clientY >= rect.bottom - horizontalScrollbarHeight;

    if (inVerticalGutter) {
      return 'vertical';
    }

    if (inHorizontalGutter) {
      return 'horizontal';
    }

    return this.detectViewportScrollbarMode(event);
  }

  private findScrollableElement(target: Element | null): HTMLElement | null {
    let element = target instanceof HTMLElement ? target : target?.parentElement ?? null;

    while (element) {
      if (element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) {
        return element;
      }

      element = element.parentElement;
    }

    return null;
  }

  private detectViewportScrollbarMode(event: MouseEvent): 'vertical' | 'horizontal' | null {
    if (event.clientX >= document.documentElement.clientWidth) {
      return 'vertical';
    }

    if (event.clientY >= document.documentElement.clientHeight) {
      return 'horizontal';
    }

    return null;
  }
}
