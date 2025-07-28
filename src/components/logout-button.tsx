import { logoutAction } from "@/data/auth-actions";
import { authStore } from "@/store/auth-store";
import { useActionState, useTransition } from "react";

type Props = {
  className?: string | undefined;
};

const LogOut = ({ className }: Props) => (
  <span className={`icon-logout ${className}`}>LogOut</span>
);

export function LogoutButton() {
  const [, loAc] = useActionState(logoutAction, null);
  const [, startTransition] = useTransition();
  const handleLogout = () => {
    authStore.trigger.logOut();
    startTransition(() => loAc());
  };

  return (
    <form action={handleLogout}>
      <button type="submit">
        <LogOut className="w-6 h-6 hover:text-primary" />
      </button>
    </form>
  );
}
