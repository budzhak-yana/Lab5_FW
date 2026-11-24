import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root', standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `<header class="navbar"><div class="container nav-inner">
    <a class="brand" routerLink="/">Lash Studio</a>
    <nav aria-label="Основна навігація">
      <a routerLink="/" routerLinkActive="current" [routerLinkActiveOptions]="{ exact: true }">Home</a>
      <a routerLink="/products" routerLinkActive="current">Products</a>
    </nav></div></header>
    <main class="container"><router-outlet /></main>
    <footer class="footer container">Lash Studio · Angular · Лабораторна робота №3</footer>`,
  styles: [`.navbar{background:#fff4f2;padding:18px 0}.nav-inner{display:flex;justify-content:space-between;align-items:center;gap:18px}.brand{color:#b77b88;font-size:26px;font-weight:700;text-decoration:none}.navbar nav{display:flex;gap:20px}.navbar nav a{text-decoration:none;color:#493c40}.navbar nav .current{color:#b77b88;text-decoration:underline}`]
})
export class AppComponent {}
