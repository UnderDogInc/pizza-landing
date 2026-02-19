export type AuthMode = "register" | "login";

export function useAuthModal() {
  const isOpen = useState<boolean>("auth-modal-open", () => false);
  const mode = useState<AuthMode>("auth-modal-mode", () => "register");

  function open(initialMode: AuthMode = "register") {
    mode.value = initialMode;
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  function setMode(value: AuthMode) {
    mode.value = value;
  }

  return {
    isOpen,
    mode,
    open,
    close,
    setMode,
  };
}
