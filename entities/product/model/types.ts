export interface Product {
  id?: number;
  title: string;
  description: string;
  price: number;
  image: string;
  imageAlt?: string;
  weight?: number;
  calories?: number;
  proteins?: number;
  fats?: number;
  carbs?: number;
}
