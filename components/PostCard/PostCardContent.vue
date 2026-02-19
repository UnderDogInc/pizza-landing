<script lang="ts" setup>
import type { IPost } from "~/types/post";

interface Props {
  post: IPost;
}

defineProps<Props>();
</script>

<template>
  <div>
    <div class="text-sm text-gray-600 mb-4 line-clamp-4 flex-grow">
      {{ post.body }}
    </div>
    <div
      class="flex justify-between items-center pt-4 border-t border-gray-200 mt-auto"
    >
      <div class="flex items-center gap-2 text-xs text-gray-500">
        <i class="pi pi-user"></i>
        <span>User {{ post.userId }}</span>
      </div>
      <div class="flex items-center gap-2 text-xs text-gray-500">
        <i class="pi pi-hashtag"></i>
        <span>#{{ post.id }}</span>
      </div>
    </div>
  </div>
</template>
