import { User } from "../../hooks/posts/usePosts";

export function Avatar({ user }: { user: User }) {
  const fullname = `${user.firstname} ${user.lastname}`;
  return (
    <img
      src={user.avatarS3Key ?? "https://via.placeholder.com/48x48"}
      className="h-12 w-12 rounded-full"
      alt={fullname}
    />
  );
}
