import type { Product } from "#entities/product";

export function useProductModal() {
  const route = useRoute();
  const router = useRouter();
  const isOpen = ref(false);
  const product = ref<Product | null>(null);

  function open(selectedProduct: Product, categorySlug: string, productIndex: number) {
    product.value = selectedProduct;
    isOpen.value = true;
    router.replace({
      query: { ...route.query, category: categorySlug, product: String(productIndex) },
    });
  }

  function close() {
    isOpen.value = false;
    product.value = null;
    const query = { ...route.query };
    delete query.category;
    delete query.product;
    router.replace({ query });
  }

  function openFromRoute(categorySlug: string, productIndex: number, products: Product[]) {
    const p = products[productIndex];
    if (p) {
      product.value = p;
      isOpen.value = true;
    }
  }

  return {
    isOpen,
    product,
    open,
    close,
    openFromRoute,
  };
}
