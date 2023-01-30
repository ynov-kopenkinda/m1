import type { User } from "../../hooks/posts/usePosts";
import { useProfilePopup } from "../../store/profile.store";
import { Avatar } from "../default/Avatar";

export const UserPreview = ({ user }: { user: User }) => {
  const fullname = `${user.firstname} ${user.lastname}`;
  const { open } = useProfilePopup();
  return (
    <button
      className="shrink-0 snap-center rounded-md border p-4"
      onClick={() => open(user)}
    >
      <div className="flex justify-start gap-4">
        <Avatar user={user} />
        <div className="flex flex-col items-start">
          <strong className="font-bold">{fullname}</strong>
          <small className="font-regular text-xs text-gray-400">
            (#{user.id})
          </small>
        </div>
      </div>
    </button>
  );
};
