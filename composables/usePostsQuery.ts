import { fetchPostsPage } from "./usePostApi";
import type { IPost } from "~/types/post";

export const usePostsQuery = () => {
  return useFetch<IPost[]>(() => {
    const config = useRuntimeConfig();
    return `${config.public.backendUrl}/posts`;
  }, {
    credentials: "include",
  });
};

export const useInfinitePosts = () => {
  const allPosts = ref<IPost[]>([]);
  const currentPage = ref(1);
  const isFetchingNextPage = ref(false);
  const hasNextPage = ref(true);

  const { data: initialData, pending, error, refresh } = useFetch<IPost[]>(
    () => {
      const config = useRuntimeConfig();
      return `${config.public.backendUrl}/posts?_limit=20&_page=1`;
    },
    {
      credentials: "include",
      immediate: true,
      watch: false,
    }
  );

  watch(
    initialData,
    (newData) => {
      if (newData) {
        allPosts.value = [...newData];
        currentPage.value = 1;
        hasNextPage.value = newData.length === 20;
      }
    },
    { immediate: true }
  );

  const loadMore = async () => {
    if (!hasNextPage.value || isFetchingNextPage.value) return;

    isFetchingNextPage.value = true;
    try {
      const nextPage = currentPage.value + 1;
      const newPosts = await fetchPostsPage(nextPage);

      if (newPosts.length > 0) {
        allPosts.value = [...allPosts.value, ...newPosts];
        currentPage.value = nextPage;
      }
      hasNextPage.value = newPosts.length === 20;
    } finally {
      isFetchingNextPage.value = false;
    }
  };

  return {
    data: computed(() => ({ pages: [allPosts.value] })),
    allPosts: computed(() => allPosts.value),
    isLoading: pending,
    isError: computed(() => !!error.value),
    error,
    fetchNextPage: loadMore,
    hasNextPage: computed(() => hasNextPage.value),
    isFetchingNextPage: computed(() => isFetchingNextPage.value),
    refresh,
  };
};
