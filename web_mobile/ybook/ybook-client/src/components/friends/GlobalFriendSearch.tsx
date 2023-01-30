import { IconMoodSad } from "@tabler/icons-react";
import { useGlobalUsers } from "../../hooks/friends/useGlobalUsers";
import { CenterLoader } from "../default/Loader";
import { SuggestedFriendPreview } from "./SuggestedFriendPreview";
import { useDebounce } from "@react-hook/debounce";
import { useEffect } from "react";

export function GlobalFriendSearch({ search }: { search: string }) {
  const [debouncedSearch, setDebouncedSearch] = useDebounce(search, 500);
  const [users, usersLoading] = useGlobalUsers(debouncedSearch);
  useEffect(() => {
    setDebouncedSearch(search);
  }, [search, setDebouncedSearch]);
  return (
    <>
      <span className="text-lg">Find friends</span>
      {usersLoading && <CenterLoader />}
      {users?.length === 0 && (
        <span className="flex items-center justify-center gap-1 text-lg">
          Nothing here <IconMoodSad size={18} stroke={2} />
        </span>
      )}
      <div className="grid gap-2">
        {users?.map((friend) => (
          <SuggestedFriendPreview friend={friend} key={friend.id} />
        ))}
      </div>
    </>
  );
}
