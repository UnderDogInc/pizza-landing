import type { Product } from "~/entities/product/model/types";
import { useBackendRequest } from "~/shared/api/useBackendRequest";
import type { CategoryItem } from "../composables/useCategoryQuery";

interface BackendCategory {
  id?: number;
  name?: string;
  slug?: string;
  category?: {
    id?: number;
    name?: string;
    slug?: string;
  };
  products?: BackendProduct[];
}

interface BackendProduct {
  id?: number;
  name?: string;
  price?: number;
  discount?: number;
  description?: string;
  info?: string;
  url?: string;
  grams?: number | null;
  proteins?: number | null;
  fats?: number | null;
  carbohydrates?: number | null;
  calories?: number | null;
  category?: {
    id?: number;
    name?: string;
    slug?: string;
  };
}

interface HomeCatalogData {
  categories: CategoryItem[];
  productsBySlug: Record<string, Product[]>;
}

interface WithData<T> {
  data: T;
}

function hasData<T>(payload: unknown): payload is WithData<T> {
  return (
    payload != null &&
    typeof payload === "object" &&
    "data" in payload
  );
}

function unwrapData<T>(payload: unknown): T {
  if (hasData<T>(payload)) {
    return payload.data;
  }
  return payload as T;
}

interface BackendCategoriesPayload {
  categories?: BackendCategory[];
}

function slugifyCategory(name: string, id?: number): string {
  const latin = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (latin) return id ? `${latin}-${id}` : latin;
  return id ? `category-${id}` : "category";
}

function getCategoryName(value: BackendCategory): string {
  return value.name || value.category?.name || "Категория";
}

function getCategorySlug(value: BackendCategory): string {
  if (value.slug) return value.slug;
  if (value.category?.slug) return value.category.slug;
  return slugifyCategory(
    getCategoryName(value),
    value.id ?? value.category?.id
  );
}

function resolveImageUrl(url?: string): string {
  if (!url) return "https://placehold.co/800x800?text=product";
  const isImageLike = /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(url);
  return isImageLike ? url : "https://placehold.co/800x800?text=product";
}

function toProductItem(item: BackendProduct): Product {
  const basePrice = Number(item.price ?? 0);
  const discount = Number(item.discount ?? 0);
  const finalPrice =
    discount > 0
      ? Math.max(0, Math.round(basePrice * (1 - discount / 100)))
      : basePrice;

  return {
    id: item.id,
    title: item.name || "Товар",
    description: item.description || item.info || "",
    price: finalPrice,
    image: resolveImageUrl(item.url),
    weight: item.grams ?? undefined,
    proteins: item.proteins ?? undefined,
    fats: item.fats ?? undefined,
    carbs: item.carbohydrates ?? undefined,
    calories: item.calories ?? undefined,
  };
}

function normalizeCategories(payload: unknown): CategoryItem[] {
  const rawData = unwrapData<BackendCategoriesPayload | BackendCategory[]>(payload);
  const list = Array.isArray(rawData)
    ? rawData
    : rawData?.categories ?? [];

  return list.map((item) => {
    const category = item as BackendCategory;
    return {
      label: getCategoryName(category),
      slug: getCategorySlug(category),
    };
  });
}

function normalizeProductsByCategory(payload: unknown): {
  categories: CategoryItem[];
  productsBySlug: Record<string, Product[]>;
} {
  const rawData = unwrapData<BackendCategoriesPayload | BackendCategory[]>(payload);
  const list = Array.isArray(rawData)
    ? rawData
    : rawData?.categories ?? [];

  const productsBySlug: Record<string, Product[]> = {};
  const categories: CategoryItem[] = [];

  for (const rawCategory of list) {
    const category = rawCategory as BackendCategory;
    const slug = getCategorySlug(category);
    const label = getCategoryName(category);
    const products = Array.isArray(category.products)
      ? category.products.map(toProductItem)
      : [];

    productsBySlug[slug] = products;
    categories.push({ label, slug });
  }

  return { categories, productsBySlug };
}

export function useHomeCatalogQuery() {
  const { request } = useBackendRequest();

  return useAsyncData<HomeCatalogData>(
    "home-catalog",
    async () => {
      const [categoriesPayload, categoriesProductsPayload] = await Promise.all([
        request("/api/categories"),
        request("/api/categories/products"),
      ]);

      const categoriesFromApi = normalizeCategories(categoriesPayload);
      const normalizedProducts = normalizeProductsByCategory(
        categoriesProductsPayload
      );

      const productsBySlug = { ...normalizedProducts.productsBySlug };

      for (const category of categoriesFromApi) {
        if (productsBySlug[category.slug]) continue;
        const fallbackCategory = normalizedProducts.categories.find(
          (item) => item.label.toLowerCase() === category.label.toLowerCase()
        );
        const fallbackProducts = fallbackCategory
          ? productsBySlug[fallbackCategory.slug]
          : undefined;
        if (fallbackProducts) {
          productsBySlug[category.slug] = fallbackProducts;
        }
      }

      const categories =
        categoriesFromApi.length > 0
          ? categoriesFromApi
          : normalizedProducts.categories;

      return {
        categories,
        productsBySlug,
      };
    },
    {
      default: () => ({
        categories: [],
        productsBySlug: {},
      }),
    }
  );
}
