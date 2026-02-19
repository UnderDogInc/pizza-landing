import { getCurrentUser as fetchCurrentUser } from "../api/authApi";
import type { User } from "./types";

export function useCurrentUser() {
  const user = useState<User | null>("current-user", () => null);
  const loading = ref(false);

  async function load() {
    loading.value = true;
    try {
      user.value = await fetchCurrentUser();
      return user.value;
    } finally {
      loading.value = false;
    }
  }

  function clear() {
    user.value = null;
  }

  return {
    user,
    loading,
    load,
    clear,
  };
}
