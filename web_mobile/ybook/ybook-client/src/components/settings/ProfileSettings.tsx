import { IconUpload } from "@tabler/icons-react";
import { env } from "../../env";
import { useSession } from "../../hooks/auth/useSession";
import { useChangeAvatar } from "../../hooks/users/useChangeAvatar";
import { useAuth } from "../../store/auth.store";
import { Avatar } from "../default/Avatar";
import { CenterLoader } from "../default/Loader";

export function ProfileSettings() {
  const { data: session } = useSession();
  const { token } = useAuth();
  const updateAvatarKey = useChangeAvatar();

  if (session == null) return <CenterLoader />;

  const chageAvatar = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file == null) return;
      (async () => {
        const res = await fetch(
          `${env.REACT_APP_BACKEND_URL}/s3upload/upload`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { url, key } = (await res.json()) as { url: string; key: string };
        const uploadRes = await fetch(url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
            // Authorization: `Bearer ${token}`,
          },
        });
        if (uploadRes.status === 200) {
          await updateAvatarKey(key);
        }
      })();
    };
  };

  return (
    <div className="flex gap-2 rounded-md border p-4">
      <Avatar className="h-16 w-16" user={session.user} />
      <div>
        <h1 className="text-xl font-bold">
          {session.user.firstname} {session.user.lastname}
        </h1>
        <p className="text-gray-400">{session.user.email}</p>
        <button
          className="flex w-full items-center justify-center gap-2 rounded-md border border-blue-500 text-sm text-blue-500"
          onClick={() => chageAvatar()}
        >
          <IconUpload size={16} stroke={1} />
          <span>Change Avatar</span>
        </button>
      </div>
    </div>
  );
}
