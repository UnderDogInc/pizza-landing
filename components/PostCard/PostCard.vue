<script lang="ts" setup>
import Card from "primevue/card";
import PostCardTitle from "./PostCardTitle.vue";
import PostCardContent from "./PostCardContent.vue";
import type { IPost } from "~/types/post";

interface Props {
  post: IPost;
}

defineProps<Props>();
</script>

<template>
  <Card class="post-card h-full flex flex-col">
    <template #title>
      <PostCardTitle :title="post.title" />
    </template>
    <template #content>
      <PostCardContent :post="post" />
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.post-card {
  @apply w-full transition-all duration-200 cursor-pointer;

  min-height: 250px;

  &:hover {
    @apply transform -translate-y-1 shadow-lg;
  }

  :deep(.p-card) {
    @apply h-full flex flex-col;
  }

  :deep(.p-card-body) {
    @apply flex flex-col flex-grow;
  }

  :deep(.p-card-content) {
    @apply flex flex-col flex-grow;
  }
}
</style>
