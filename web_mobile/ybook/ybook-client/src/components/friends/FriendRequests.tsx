import { IconUserPlus } from "@tabler/icons-react";
import { User } from "../../api/api.types";
import { useFriendRequests } from "../../hooks/friends/useFriendRequests";
import { useSendFriendRequest } from "../../hooks/friends/useSendFriendRequest";
import { Avatar } from "../default/Avatar";
import { CenterLoader } from "../default/Loader";

export const FriendRequests = () => {
  const [friendRequests, isFriendRequestsLoading] = useFriendRequests();
  if (friendRequests?.length === 0) return null;
  return (
    <>
      <span className="text-lg">Friend requests</span>
      {isFriendRequestsLoading && <CenterLoader />}
      {friendRequests?.map((from) => (
        <FriendRequest key={from.id} from={from} />
      ))}
    </>
  );
};

function FriendRequest({ from }: { from: User }) {
  const fullname = `${from.firstname} ${from.lastname}`;
  const sendFriendRequest = useSendFriendRequest();
  return (
    <div className="shrink-0 snap-center rounded-md border p-4">
      <div className="flex justify-start gap-4">
        <Avatar user={from} />
        <div className="flex flex-col justify-between">
          <strong className="font-bold">{fullname}</strong>
          <button
            className="flex items-center justify-center rounded-md border border-green-600 py-1 text-green-600"
            onClick={() => sendFriendRequest({ email: from.email })}
          >
            <IconUserPlus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
