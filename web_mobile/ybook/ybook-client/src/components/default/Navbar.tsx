import {
  IconHome,
  IconMessage,
  IconPlus,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import cx from "classnames";

export function AppNavbar() {
  return (
    <div className="fixed left-2 right-2 bottom-2 flex h-16 items-center justify-between rounded-full border bg-white/75 px-4 backdrop-blur-sm">
      <NavbarIcon to="/" icon={IconHome} />
      <NavbarIcon to="/friends" icon={IconUsers} />
      <NavbarIcon to="/new-post" icon={IconPlus} />
      <NavbarIcon to="/messages" icon={IconMessage} />
      <NavbarIcon to="/settings" icon={IconSettings} />
    </div>
  );
}

function NavbarIcon({ icon: Icon, to }: { icon: typeof IconHome; to: string }) {
  const location = useLocation();
  const isActive =
    to === "/" ? location.pathname === to : location.pathname.startsWith(to);
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
        <Icon stroke={1} />
      </div>
    </Link>
  );
}
