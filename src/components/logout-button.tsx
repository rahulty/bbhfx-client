import { logoutAction } from "@/data/auth-actions";

type Props = {
  className?: string | undefined;
};

const LogOut = ({ className }: Props) => (
  <span className={`icon-logout ${className}`}>LogOut</span>
);

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit">
        <LogOut className="w-6 h-6 hover:text-primary" />
      </button>
    </form>
  );
}
