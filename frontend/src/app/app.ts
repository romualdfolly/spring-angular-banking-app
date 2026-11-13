import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavLink } from './pages/shared/nav-link/nav-link';

@Component({
  imports: [FormsModule, RouterOutlet, NavLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly titleService = inject(Title);
  protected readonly title = signal('Bank Portfolio');

  constructor() {
    this.titleService.setTitle(this.title());
  }
}
