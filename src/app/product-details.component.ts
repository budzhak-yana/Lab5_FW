
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink],
  template: `
    <p><a routerLink="/products">← До каталогу</a></p>

    @if (loading()) {
      <p>Завантаження...</p>
    }

    @if (error()) {
      <p class="error">{{ error() }}</p>
    }

    @if (product(); as p) {
      <article class="panel">
        <h1>{{ p.name }}</h1>
        <p>Категорія: {{ p.category }}</p>
        <p>{{ p.description }}</p>
        <p><strong>{{ p.price }} грн</strong></p>

        <div class="actions">
          <a class="btn secondary"
             [routerLink]="['/products', p._id, 'edit']">
            Редагувати
          </a>

          <button class="btn danger" (click)="remove()">
            Видалити
          </button>
        </div>
      </article>
    }
  `
})
export class ProductDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(ProductsService);

  readonly product = signal<Product | null>(null);
  readonly loading = signal(false);
  readonly error = signal('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('Некоректний ID послуги');
      return;
    }

    this.loading.set(true);

    this.service.get(id).subscribe({
      next: p => {
        this.product.set(p);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Послугу не знайдено');
        this.loading.set(false);
      }
    });
  }

  remove(): void {
    const id = this.product()?._id;

    if (!id) return;

    this.service.delete(id).subscribe({
      next: () => void this.router.navigate(['/products']),
      error: () => this.error.set('Не вдалося видалити послугу')
    });
  }
}
