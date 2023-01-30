import { IconMoodSad } from "@tabler/icons-react";
import { useFriends } from "../../hooks/friends/useFriends";
import { CenterLoader } from "../default/Loader";
import { FriendPreview } from "./FriendPreview";

export function YourFriends({ search }: { search: string }) {
  const [friends, friendsLoading] = useFriends();
  const filteredFriends =
    friends?.filter((friend) =>
      `${friend.firstname}${friend.lastname}${friend.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    ) ?? [];

  return (
    <>
      <span className="text-lg">Your friends</span>
      {friendsLoading && <CenterLoader />}
      {filteredFriends.length === 0 && (
        <span className="flex items-center justify-center gap-1 text-lg">
          Nothing here <IconMoodSad size={18} stroke={2} />
        </span>
      )}
      <div className="flex flex-col gap-2">
        {filteredFriends.map((friend) => (
          <FriendPreview friend={friend} key={friend.id} />
        ))}
      </div>
    </>
  );
}
