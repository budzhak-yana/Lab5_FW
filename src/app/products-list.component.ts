import { Component, OnInit, computed, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService } from './products.service';
import { Product } from './product.model';
@Component({
  selector: 'app-products-list', standalone: true, imports: [RouterLink, FormsModule],
  template: `<section class="toolbar"><h1>Products — послуги</h1><a class="btn" routerLink="/products/new">Додати послугу</a></section>
    <div class="panel toolbar">
      <label>Категорія: <select [ngModel]="selectedCategory()" (ngModelChange)="setCategory($event)">
        <option value="">Усі</option>
        @for (c of categories(); track c) { <option [value]="c">{{ c }}</option> }
      </select></label>
      <span class="muted">Знайдено: {{ filteredProducts().length }}</span>
    </div>
    @if (error()) { <p class="error">{{ error() }}</p> }
    @if (loading()) { <p>Завантаження...</p> }
    <div class="cards">
      @for (p of pagedProducts(); track p._id) {
        <article class="card"><h3>{{ p.name }}</h3><p class="muted">{{ p.category }}</p>
          <p><strong>{{ p.price }} грн</strong></p><a [routerLink]="['/products', p._id]">Детальніше</a>
        </article>
      } @empty { @if (!loading()) { <p>Послуг немає.</p> } }
    </div>
    <div class="actions"><button class="btn secondary" (click)="previous()" [disabled]="page() === 1">Назад</button>
      <span>Сторінка {{ page() }} із {{ totalPages() }}</span>
      <button class="btn secondary" (click)="next()" [disabled]="page() >= totalPages()">Далі</button></div>`,
  styles: [`select{padding:7px;border:1px solid #ddc7cd;border-radius:6px;margin-left:6px}`]
})
export class ProductsListComponent implements OnInit {
  private readonly service = inject(ProductsService);
  readonly products = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly selectedCategory = signal('');
  readonly page = signal(1);
  readonly pageSize = 3;
  readonly categories = computed(() => [...new Set(this.products().map(p => p.category))]);
  readonly filteredProducts = computed(() => this.selectedCategory() ? this.products().filter(p => p.category === this.selectedCategory()) : this.products());
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filteredProducts().length / this.pageSize)));
  readonly pagedProducts = computed(() => this.filteredProducts().slice((this.page() - 1) * this.pageSize, this.page() * this.pageSize));
  ngOnInit(): void {
    this.service.list().subscribe({ next: p => { this.products.set(p); this.loading.set(false); }, error: () => { this.error.set('Не вдалося завантажити послуги'); this.loading.set(false); } });
  }
  setCategory(category: string): void { this.selectedCategory.set(category); this.page.set(1); }
  previous(): void { this.page.update(p => Math.max(1, p - 1)); }
  next(): void { this.page.update(p => Math.min(this.totalPages(), p + 1)); }
}
