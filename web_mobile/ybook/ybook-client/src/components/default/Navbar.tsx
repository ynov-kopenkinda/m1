import {
  IconHome,
  IconMessage,
  IconPlus,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import cx from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useSession } from "../../hooks/auth/useSession";
import { Avatar } from "./Avatar";

export function AppNavbar() {
  const { data: session, status } = useSession();
  return (
    <div className="fixed left-2 right-2 bottom-2 flex h-16 items-center justify-between rounded-full border bg-white/75 px-4 backdrop-blur-sm">
      <NavbarIcon to="/" icon={<IconHome stroke={1} />} />
      <NavbarIcon to="/friends" icon={<IconUsers stroke={1} />} />
      <NavbarIcon to="/new-post" icon={<IconPlus stroke={1} />} />
      <NavbarIcon to="/messages" icon={<IconMessage stroke={1} />} />
      {status === "success" && (
        <NavbarIcon to="/settings" icon={<Avatar user={session.user} />} />
      )}
    </div>
  );
}

function NavbarIcon({ icon: Icon, to }: { icon: JSX.Element; to: string }) {
  const location = useLocation();
  const isActive =
    to === "/" ? location.pathname === to : location.pathname.startsWith(to);
  console.log({ Icon });
  return (
    <Link to={to}>
      <div
        className={cx(
          "flex h-12 w-12 flex-col items-center justify-center rounded-full",
          {
            "bg-blue-500 text-white": isActive,
          }
        )}
      >
        {Icon}
      </div>
    </Link>
  );
}
