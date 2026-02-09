import type { IPost } from "~/types/post";

const POSTS_PAGE_SIZE = 20;

export const getPostsUrl = (page: number) => {
  const config = useRuntimeConfig();
  return `${config.public.backendUrl}/posts?_limit=${POSTS_PAGE_SIZE}&_page=${page}`;
};

export const fetchPostsPage = async (page: number): Promise<IPost[]> => {
  const config = useRuntimeConfig();
  return $fetch<IPost[]>(
    `${config.public.backendUrl}/posts?_limit=${POSTS_PAGE_SIZE}&_page=${page}`,
    { credentials: "include" }
  );
};

export { POSTS_PAGE_SIZE };
