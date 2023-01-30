import { useState } from "react";
import { FriendRequests } from "../components/friends/FriendRequests";
import { GlobalFriendSearch } from "../components/friends/GlobalFriendSearch";
import { SuggestedFriends } from "../components/friends/SuggestedFriends";
import { YourFriends } from "../components/friends/YourFriends";

export default function FriendsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <h1 className="mb-4 text-4xl font-black">Friends</h1>
      <SuggestedFriends />
      <input
        type="text"
        placeholder="Search for friends"
        className="rounded-md border p-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FriendRequests />
      <YourFriends search={search} />
      <GlobalFriendSearch search={search} />
    </div>
  );
}
