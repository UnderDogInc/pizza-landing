import {
  addCartItem,
  deleteCartItem,
  deleteFullCartItem,
  fetchCart,
  fetchCartCounter,
} from "../api/cartApi";
import type {
  ApiError,
  CartGetCounterData,
  CartPayload,
  CartProduct,
  CartProductInput,
  CartProductItem,
  CartPromo,
  CartPromoInput,
  CartPromoItem,
  CartState,
} from "./types";

const EMPTY_CART: CartState = {
  id: 0,
  products: [],
  promo: [],
};

const CART_LOADER_MIN_MS = 350;

function toProductInput(product: CartProductInput): CartProduct {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    url: product.imageUrl,
    grams: product.grams ?? null,
    proteins: product.proteins ?? null,
    fats: product.fats ?? null,
    carbohydrates: product.carbohydrates ?? null,
    calories: product.calories ?? null,
  };
}

function toPromoInput(promo: CartPromoInput): CartPromo {
  return {
    id: promo.id,
    name: promo.name,
    price: promo.price,
    description: promo.description,
    oldPrice: promo.oldPrice,
    url: promo.url,
  };
}

function normalizeCounter(payload: CartGetCounterData): number {
  if (!payload) return 0;
  if (typeof payload === "number") return payload;
  return 0;
}

export function useCart() {
  const cart = useState<CartState>("cart-state", () => ({ ...EMPTY_CART }));
  const sumState = useState<number>("cart-sum", () => 0);
  const counterState = useState<number>("cart-counter", () => 0);
  const pendingState = useState<boolean>("cart-pending", () => false);
  const initializedState = useState<boolean>("cart-initialized", () => false);
  const errorState = useState<Maybe<ApiError>>("cart-error", () => null);

  function findProductLine(product: CartProductInput): Maybe<CartProductItem> {
    return (
      cart.value.products.find((line) =>
        product.id
          ? line.product.id === product.id
          : line.product.name === product.name
      ) ?? null
    );
  }

  function findPromoLine(promo: CartPromoInput): Maybe<CartPromoItem> {
    return (
      cart.value.promo.find((line) =>
        promo.id ? line.promo.id === promo.id : line.promo.name === promo.name
      ) ?? null
    );
  }

  function applyCartPayload(payload: Maybe<CartPayload | false>) {
    if (!payload) {
      cart.value = { ...EMPTY_CART };
      sumState.value = 0;
      return;
    }
    cart.value = payload.cart;
    sumState.value = payload.sum ?? 0;
  }

  function setUnexpectedError(message: string) {
    errorState.value = {
      statusCode: 500,
      message,
      error: "Internal Error",
    };
  }

  async function refreshCart() {
    try {
      const response = await fetchCart();
      applyCartPayload(response.data);
      errorState.value = response.error;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Не удалось загрузить корзину";
      setUnexpectedError(message);
    }
  }

  async function refreshCounter() {
    try {
      const response = await fetchCartCounter();
      counterState.value = normalizeCounter(response.data);
      if (response.error) {
        errorState.value = response.error;
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Не удалось загрузить счетчик корзины";
      setUnexpectedError(message);
    }
  }

  async function refreshAll(withLoader = true) {
    if (withLoader) {
      pendingState.value = true;
    }
    try {
      await Promise.all([refreshCart(), refreshCounter()]);
    } finally {
      if (withLoader) {
        pendingState.value = false;
      }
    }
  }

  const runMutationDebounced = useDebounceFn(
    async (mutation: () => Promise<void>) => {
      if (pendingState.value) return;
      const startedAt = Date.now();
      pendingState.value = true;
      try {
        await mutation();
        await refreshAll(false);
      } finally {
        const elapsed = Date.now() - startedAt;
        if (elapsed < CART_LOADER_MIN_MS) {
          await new Promise((resolve) =>
            setTimeout(resolve, CART_LOADER_MIN_MS - elapsed)
          );
        }
        pendingState.value = false;
      }
    },
    250,
    { maxWait: 1000 }
  );

  async function addProduct(product: CartProductInput) {
    if (!product.id) return;
    try {
      await runMutationDebounced(async () => {
        await addCartItem({ productId: product.id! });
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ошибка при добавлении товара";
      setUnexpectedError(message);
    }
  }

  async function decrementProduct(product: CartProductInput): Promise<void> {
    if (!product.id) return;
    try {
      await runMutationDebounced(async () => {
        await deleteCartItem({ productId: product.id! });
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ошибка при удалении товара";
      setUnexpectedError(message);
    }
  }

  async function deleteFullProduct(product: CartProductInput): Promise<void> {
    if (!product.id) return;
    try {
      await runMutationDebounced(async () => {
        await deleteFullCartItem({ productId: product.id! });
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ошибка при полном удалении товара";
      setUnexpectedError(message);
    }
  }

  async function addPromo(promo: CartPromoInput) {
    if (!promo.id) return;
    try {
      await runMutationDebounced(async () => {
        await addCartItem({ productId: promo.id! });
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ошибка при добавлении комбо";
      setUnexpectedError(message);
    }
  }

  async function decrementPromo(promo: CartPromoInput): Promise<void> {
    if (!promo.id) return;
    try {
      await runMutationDebounced(async () => {
        await deleteCartItem({ productId: promo.id! });
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ошибка при удалении комбо";
      setUnexpectedError(message);
    }
  }

  async function deleteFullPromo(promo: CartPromoInput): Promise<void> {
    if (!promo.id) return;
    try {
      await runMutationDebounced(async () => {
        await deleteFullCartItem({ productId: promo.id! });
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ошибка при полном удалении комбо";
      setUnexpectedError(message);
    }
  }

  function getProductQuantity(product: CartProductInput): number {
    return findProductLine(product)?.quantity ?? 0;
  }

  function getPromoQuantity(promo: CartPromoInput): number {
    return findPromoLine(promo)?.quantity ?? 0;
  }

  if (import.meta.client && !initializedState.value) {
    initializedState.value = true;
    void refreshAll();
  }

  const totalCount = computed(() => {
    if (counterState.value > 0) return counterState.value;
    return (
      cart.value.products.reduce((sum, item) => sum + item.quantity, 0) +
      cart.value.promo.reduce((sum, item) => sum + item.quantity, 0)
    );
  });

  const items = computed(() => [
    ...cart.value.products.map((line) => ({
      id: line.id,
      quantity: line.quantity,
      type: "product" as const,
      title: line.product.name,
      price: line.product.price,
    })),
    ...cart.value.promo.map((line) => ({
      id: line.id,
      quantity: line.quantity,
      type: "promo" as const,
      title: line.promo.name,
      price: line.promo.price,
    })),
  ]);

  const response = computed(() => ({
    data: {
      cart: cart.value,
      sum: sumState.value,
    },
    error: errorState.value,
  }));

  return {
    cart,
    sum: computed(() => sumState.value),
    response,
    items,
    totalCount,
    pending: computed(() => pendingState.value),
    error: computed(() => errorState.value),
    refreshCart,
    refreshCounter,
    refreshAll,
    addProduct: (product: CartProductInput) =>
      addProduct(toProductInput(product)),
    decrementProduct: (product: CartProductInput) =>
      decrementProduct(toProductInput(product)),
    deleteFullProduct: (product: CartProductInput) =>
      deleteFullProduct(toProductInput(product)),
    getProductQuantity: (product: CartProductInput) =>
      getProductQuantity(toProductInput(product)),
    addPromo: (promo: CartPromoInput) => addPromo(toPromoInput(promo)),
    decrementPromo: (promo: CartPromoInput) =>
      decrementPromo(toPromoInput(promo)),
    deleteFullPromo: (promo: CartPromoInput) =>
      deleteFullPromo(toPromoInput(promo)),
    getPromoQuantity: (promo: CartPromoInput) =>
      getPromoQuantity(toPromoInput(promo)),
  };
}
