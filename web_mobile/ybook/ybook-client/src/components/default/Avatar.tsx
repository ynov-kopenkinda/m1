import { User } from "../../hooks/posts/usePosts";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

export function Avatar({ user }: { user: User }) {
  const fullname = `${user.firstname} ${user.lastname}`;
  let url: string = user.avatarS3Key ?? "";
  if (user.avatarS3Key === null) {
    const avatar = createAvatar(lorelei, {
      seed: fullname,
    });
    url = avatar.toDataUriSync();
  }
  return <img src={url} className="h-12 w-12 rounded-full" alt={fullname} />;
}
