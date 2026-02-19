<script lang="ts" setup>
interface Props {
  animation?: "fade" | "fade-up" | "fade-down";
  delay?: number;
  rootMargin?: string;
}

const props = withDefaults(defineProps<Props>(), {
  animation: "fade-up",
  delay: 0,
  rootMargin: "0px 0px -30px 0px",
});

const target = ref<Maybe<HTMLElement>>(null);
const isVisible = useScrollReveal(target, {
  rootMargin: props.rootMargin,
  threshold: 0,
  once: true,
});
</script>

<template>
  <div
    ref="target"
    class="scroll-reveal"
    :class="[
      isVisible && 'scroll-reveal--visible',
      `scroll-reveal--${animation}`,
    ]"
    :style="isVisible && delay ? { animationDelay: `${delay}ms` } : undefined"
  >
    <div class="scroll-reveal__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.scroll-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;
}

.scroll-reveal--visible {
  opacity: 1;
  transform: translateY(0);
}

.scroll-reveal--fade {
  transform: none;
}

.scroll-reveal--fade-down {
  transform: translateY(-20px);
}

.scroll-reveal--fade-down.scroll-reveal--visible {
  transform: translateY(0);
}
</style>
