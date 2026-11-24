import { Product } from './product.model';
// Навчальні дані за тематикою Lash Studio (приклад каталогу).
export const initialProducts: Product[] = [
  { id: 1, name: 'Ламінування вій', category: 'Вії', price: 900, description: 'Догляд і природний вигин вій.' },
  { id: 2, name: 'Фарбування вій', category: 'Вії', price: 350, description: 'Надання віям виразнішого кольору.' },
  { id: 3, name: 'Ламінування брів', category: 'Брови', price: 700, description: 'Укладання та фіксація форми брів.' },
  { id: 4, name: 'Корекція брів', category: 'Брови', price: 300, description: 'Оформлення бажаної форми брів.' },
  { id: 5, name: 'Фарбування брів', category: 'Брови', price: 350, description: 'Підкреслення кольору брів.' },
  { id: 6, name: 'Догляд за віями', category: 'Догляд', price: 450, description: 'Базова процедура догляду за віями.' }
];
