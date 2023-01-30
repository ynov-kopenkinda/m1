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
import { useNotifications } from "../../hooks/notifications/useNotifications";
import { Avatar } from "./Avatar";

export function AppNavbar() {
  const { data: session, status } = useSession();
  const [notifications] = useNotifications();
  return (
    <div className="fixed left-2 right-2 bottom-2 flex h-16 items-center justify-between rounded-full border bg-white/75 px-4 backdrop-blur-sm">
      <NavbarIcon to="/" icon={<IconHome stroke={1} />} />
      <NavbarIcon to="/friends" icon={<IconUsers stroke={1} />} />
      <NavbarIcon to="/new-post" icon={<IconPlus stroke={1} />} />
      <NavbarIcon to="/messages" icon={<IconMessage stroke={1} />} />
      {status === "success" && (
        <NavbarIcon
          to="/settings"
          icon={
            <>
              {notifications !== undefined && notifications?.length > 0 && (
                <span className=" absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {notifications.length}
                </span>
              )}
              <Avatar user={session.user} />
            </>
          }
        />
      )}
    </div>
  );
}

function NavbarIcon({ icon: Icon, to }: { icon: JSX.Element; to: string }) {
  const location = useLocation();
  const isActive =
    to === "/" ? location.pathname === to : location.pathname.startsWith(to);
  return (
    <Link to={to}>
      <div
        className={cx(
          "relative flex h-12 w-12 flex-col items-center justify-center rounded-full",
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
