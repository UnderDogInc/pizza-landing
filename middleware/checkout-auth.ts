export default defineNuxtRouteMiddleware(async () => {
  const { user, load } = useCurrentUser();
  await load();

  if (!user.value) {
    const { open } = useAuthModal();
    open("register");
    return navigateTo("/");
  }
});
