import cx from "classnames";
import { Session, User } from "../../api/api.types";
import { useSession } from "../../hooks/auth/useSession";
import { useProfilePopup } from "../../store/profile.store";
import { Avatar } from "./Avatar";

export function ProfilePreview() {
  return (
    <>
      <ProfilePreviewOverlay />
      <ProfilePreviewCard />
    </>
  );
}

function ProfilePreviewOverlay() {
  const { close, user } = useProfilePopup();
  return (
    <div
      className={cx("fixed inset-0 z-40 bg-black/60 transition-opacity", {
        "translate-y-full opacity-0": user === null,
        "opacity-1 translate-y-0": user !== null,
      })}
      onClick={() => close()}
    />
  );
}

function ProfilePreviewCard() {
  const { user } = useProfilePopup();
  const { data: session } = useSession();
  return (
    <div
      className={cx(
        "fixed bottom-0 left-0 right-0 z-50 flex h-[512px] flex-col items-center gap-2 rounded-md bg-white p-4 pt-16 transition-transform",
        {
          "translate-y-full": user === null,
          "translate-y-0": user !== null,
        }
      )}
    >
      {user !== null && session != null ? (
        <ProfilePreviewCardInner user={user} session={session} />
      ) : null}
    </div>
  );
}

function ProfilePreviewCardInner({
  user,
  session,
}: {
  user: User;
  session: Session;
}) {
  return (
    <>
      <div className="absolute left-1/2 top-0 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 bg-white">
        <Avatar user={user} className="h-full w-full" />
      </div>
      <h1 className="text-2xl font-black">
        {user.firstname} {user.lastname}
      </h1>
      <p className="text-gray-400">
        <strong className="font-black">#{user.id}</strong> {user.email}{" "}
        {user.email === session?.email && "(You)"}
      </p>
    </>
  );
}
