import type { CategoryItem } from "./useCategoryQuery";
import { useCategoryQuery } from "./useCategoryQuery";
import { useCategoryScrollSpy } from "./useCategoryScrollSpy";

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  { label: "Пицца", slug: "pizza" },
  { label: "Бургеры", slug: "burgery" },
  { label: "Закуски", slug: "zakuski" },
  { label: "Горячее", slug: "gorachee" },
  { label: "Напитки", slug: "napitki" },
  { label: "Десерты", slug: "deserty" },
];

export function useCategories(categories = DEFAULT_CATEGORIES) {
  const selectedSlug = ref<string | null>(null);
  const isScrollingProgrammatically = ref(false);

  const { getCategoryFromQuery, setCategoryInQuery } = useCategoryQuery(
    categories,
    (slug) => {
      selectedSlug.value = slug;
    }
  );

  const {
    setUserHasScrolled,
    setupObserver,
    initScrollListener,
    scrollToSection,
    scrollToSectionImmediate,
  } = useCategoryScrollSpy({
    categories,
    selectedSlug,
    setCategoryInQuery,
    isScrollingProgrammatically,
  });

  function selectCategory(slug: string) {
    selectedSlug.value = slug;
    setCategoryInQuery(slug);
    scrollToSection(slug);
  }

  let removeScrollListener: (() => void) | null = null;
  let disconnectObserver: (() => void) | null = null;

  onUnmounted(() => {
    removeScrollListener?.();
    disconnectObserver?.();
  });

  function init() {
    const queryCategory = getCategoryFromQuery();
    if (queryCategory) {
      selectedSlug.value = queryCategory;
      setUserHasScrolled(true);
      nextTick(() => scrollToSectionImmediate(queryCategory));
    }

    removeScrollListener = initScrollListener();
    nextTick(() => {
      disconnectObserver = setupObserver();
    });
  }

  return {
    categories,
    selectedSlug,
    selectCategory,
    init,
  };
}
