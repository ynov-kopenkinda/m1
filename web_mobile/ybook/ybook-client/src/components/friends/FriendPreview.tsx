import { IconMessage, IconTrash } from "@tabler/icons-react";
import { useRemoveFriendship } from "../../hooks/friends/useRemoveFriendship";
import type { User } from "../../hooks/posts/usePosts";
import { Avatar } from "../default/Avatar";

export const FriendPreview = ({ friend }: { friend: User }) => {
  const fullname = `${friend.firstname} ${friend.lastname}`;
  const removeFriend = useRemoveFriendship();
  return (
    <div className="shrink-0 snap-center rounded-md border p-4">
      <div className="flex justify-start gap-4">
        <Avatar user={friend} />
        <div className="flex flex-col justify-between">
          <strong className="font-bold">
            {fullname}
            <small className="font-regular ml-2 text-xs text-gray-400">
              (#{friend.id})
            </small>
          </strong>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center rounded-md border border-gray-500 py-1 text-gray-500">
              <IconMessage size={16} />
            </button>

            <button
              className="flex items-center justify-center rounded-md border border-red-500 py-1 text-red-500"
              onClick={() => removeFriend({ friendId: friend.id })}
            >
              <IconTrash size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
