import type { Ref } from "vue";

export interface UseScrollRevealOptions {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}

export function useScrollReveal(
  target: Ref<HTMLElement | null | undefined>,
  options: UseScrollRevealOptions = {},
) {
  const { rootMargin = "0px 0px -50px 0px", threshold = 0, once = true } = options;
  const isVisible = ref(false);

  if (import.meta.server) {
    return isVisible;
  }

  useIntersectionObserver(
    target,
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true;
      } else if (!once) {
        isVisible.value = false;
      }
    },
    {
      rootMargin,
      threshold,
    },
  );

  return isVisible;
}
