import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home', standalone: true, imports: [RouterLink],
  template: `<section class="hero">
    <div><p class="eyebrow">LASH STUDIO</p><h1>Краса у деталях</h1>
    <p>Ламінування вій та догляд за бровами.</p>
    <a class="btn" routerLink="/products">Переглянути послуги</a></div>
    <img src="/lashes.jpg" alt="Ламінування вій" />
  </section>`,
  styles: [`.hero{background:#fff4f2;border-radius:14px;margin:30px 0;padding:36px;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:26px}.hero img{width:100%;height:290px;object-fit:cover;border-radius:12px}.eyebrow{color:#b77b88;letter-spacing:3px;font-weight:bold}.hero h1{font-size:clamp(32px,4vw,54px)}.hero p{line-height:1.7}@media(max-width:700px){.hero{grid-template-columns:1fr}}`]
})
export class HomeComponent {}
