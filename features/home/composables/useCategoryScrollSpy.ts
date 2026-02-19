import type { Ref } from "vue";
import type { CategoryItem } from "./useCategoryQuery";

export interface UseCategoryScrollSpyOptions {
  categories: CategoryItem[];
  selectedSlug: Ref<string | null>;
  setCategoryInQuery: (slug: string) => void;
  isScrollingProgrammatically: Ref<boolean>;
}

export function useCategoryScrollSpy(options: UseCategoryScrollSpyOptions) {
  const {
    categories,
    selectedSlug,
    setCategoryInQuery,
    isScrollingProgrammatically,
  } = options;

  const userHasScrolled = ref(false);

  function setUserHasScrolled(value: boolean) {
    userHasScrolled.value = value;
  }

  function setupObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingProgrammatically.value || !userHasScrolled.value) {
          return;
        }

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const id = entry.target.id;
          if (!id?.startsWith("category-")) continue;

          const slug = id.replace("category-", "");
          if (!categories.some((c) => c.slug === slug)) continue;

          selectedSlug.value = slug;
          setCategoryInQuery(slug);
          break;
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    categories.forEach(({ slug }) => {
      const el = document.getElementById(`category-${slug}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }

  function initScrollListener() {
    const handleScroll = () => {
      userHasScrolled.value = true;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }

  function scrollToSection(slug: string) {
    const section = document.getElementById(`category-${slug}`);
    if (section) {
      isScrollingProgrammatically.value = true;
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        isScrollingProgrammatically.value = false;
      }, 1000);
    }
  }

  function scrollToSectionImmediate(slug: string) {
    const section = document.getElementById(`category-${slug}`);
    if (section) {
      section.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }

  return {
    setUserHasScrolled,
    setupObserver,
    initScrollListener,
    scrollToSection,
    scrollToSectionImmediate,
  };
}
