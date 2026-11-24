
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <p><a routerLink="/products">← До каталогу</a></p>
    <section class="panel">
      <h1>{{ editId === null ? 'Додати послугу' : 'Редагувати послугу' }}</h1>

      @if (error()) {
        <p class="error">{{ error() }}</p>
      }

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label class="form-row">
          Назва
          <input formControlName="name" />
          @if (form.controls.name.touched && form.controls.name.invalid) {
            <span class="error">Вкажіть назву.</span>
          }
        </label>

        <label class="form-row">
          Категорія
          <input formControlName="category" />
          @if (form.controls.category.touched && form.controls.category.invalid) {
            <span class="error">Вкажіть категорію.</span>
          }
        </label>

        <label class="form-row">
          Ціна (грн)
          <input formControlName="price" type="number" min="1" />
          @if (form.controls.price.touched && form.controls.price.invalid) {
            <span class="error">Ціна має бути не менше 1.</span>
          }
        </label>

        <label class="form-row">
          Опис
          <input formControlName="description" />
        </label>

        <button class="btn" type="submit"
          [disabled]="form.invalid || saving()">
          Зберегти
        </button>
      </form>
    </section>
  `
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(ProductsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly saving = signal(false);
  readonly error = signal('');

  editId: string | null = null;

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: [1, [Validators.required, Validators.min(1)]],
    description: ['']
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.editId = id;

      this.service.get(id).subscribe({
        next: p => this.form.patchValue(p),
        error: () => this.error.set('Послугу не знайдено')
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set('');

    const data = this.form.getRawValue();

    const request = this.editId === null
      ? this.service.create(data)
      : this.service.update(this.editId, data);

    request.subscribe({
      next: p => void this.router.navigate(['/products', p._id]),
      error: () => {
        this.error.set('Не вдалося зберегти');
        this.saving.set(false);
      }
    });
  }
}
