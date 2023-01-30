import { IconUserPlus } from "@tabler/icons-react";
import type { User } from "../../hooks/posts/usePosts";
import { Avatar } from "../default/Avatar";

export const SuggestedFriendPreview = ({ friend }: { friend: User }) => {
  const fullname = `${friend.firstname} ${friend.lastname}`;
  return (
    <div className="shrink-0 snap-center rounded-md border p-4">
      <div className="flex justify-start gap-4">
        <Avatar user={friend} />
        <div className="flex flex-col justify-between">
          <strong className="font-bold">{fullname}</strong>
          <button className="flex items-center justify-center rounded-md border border-green-600 py-1 text-green-600">
            <IconUserPlus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
