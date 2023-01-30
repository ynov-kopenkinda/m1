import { useSuggestedFriends } from "../../hooks/friends/useSuggestedFriends";
import { CenterLoader } from "../default/Loader";
import { SuggestedFriendPreview } from "./SuggestedFriendPreview";

export function SuggestedFriends() {
  const [suggestedFriends, suggestedFriendsLoading] = useSuggestedFriends();

  return (
    <>
      <span className="text-lg">Suggested</span>
      {suggestedFriendsLoading && <CenterLoader />}
      <div className="relative flex w-full snap-x gap-6 overflow-x-auto py-2">
        {suggestedFriends?.map((friend) => (
          <SuggestedFriendPreview key={friend.id} friend={friend} />
        ))}
      </div>
    </>
  );
}
