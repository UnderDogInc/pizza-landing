export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}

export interface ApiResponse<T> {
  data: T;
  error: Maybe<ApiError>;
}

export interface CartProduct {
  id?: number;
  name: string;
  price: number;
  order?: number;
  discount?: number;
  info?: string;
  description?: string;
  url?: string;
  grams?: Maybe<number>;
  proteins?: Maybe<number>;
  fats?: Maybe<number>;
  carbohydrates?: Maybe<number>;
  calories?: Maybe<number>;
  category?: {
    id: number;
    name: string;
  };
  promo?: unknown[];
}

export interface CartPromo {
  id?: number;
  name: string;
  description?: string;
  url?: string;
  price: number;
  oldPrice?: number;
}

export interface CartProductItem {
  id: number;
  quantity: number;
  product: CartProduct;
}

export interface CartPromoItem {
  id: number;
  quantity: number;
  promo: CartPromo;
}

export interface CartState {
  id: number;
  products: CartProductItem[];
  promo: CartPromoItem[];
}

export interface CartPayload {
  cart: CartState;
  sum: number;
}

export type CartGetCartData = Maybe<CartPayload | false>;
export type CartGetCounterData = Maybe<number | false>;

export interface CartMutationDto {
  productId: number;
}

export interface CartProductInput {
  id?: number;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  grams?: Maybe<number>;
  proteins?: Maybe<number>;
  fats?: Maybe<number>;
  carbohydrates?: Maybe<number>;
  calories?: Maybe<number>;
}

export interface CartPromoInput {
  id?: number;
  name: string;
  price: number;
  description?: string;
  oldPrice?: number;
  url?: string;
}
