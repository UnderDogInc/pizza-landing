export interface CategoryItem {
  label: string;
  slug: string;
}

export function useCategoryQuery(
  categories: CategoryItem[],
  onCategoryChange: (slug: string) => void,
) {
  const route = useRoute();
  const router = useRouter();

  function getCategoryFromQuery(): string | null {
    const category = route.query.category;
    if (
      typeof category === "string" &&
      categories.some((c) => c.slug === category)
    ) {
      return category;
    }
    return null;
  }

  function setCategoryInQuery(slug: string) {
    router.replace({
      query: { ...route.query, category: slug },
    });
  }

  watch(
    () => route.query.category,
    (newCategory) => {
      if (
        typeof newCategory === "string" &&
        categories.some((c) => c.slug === newCategory)
      ) {
        onCategoryChange(newCategory);
      }
    },
  );

  return { getCategoryFromQuery, setCategoryInQuery };
}
