import { createAvatar } from "@dicebear/core";
import { croodlesNeutral } from "@dicebear/collection";
import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import cx from "classnames";
import { useS3Image } from "../../hooks/users/useS3Image";
import { User } from "../../api/api.types";

export const Avatar = forwardRef<
  HTMLImageElement,
  DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    user: User;
  }
>(function ({ user, className = "w-12 h-12", ...props }, ref) {
  const fullname = `${user.firstname} ${user.lastname}`;
  const s3avatar = useS3Image(user.avatarS3Key);
  let url: string = s3avatar ?? "";
  if (user.avatarS3Key === null) {
    const avatar = createAvatar(croodlesNeutral, {
      seed: fullname,
    });
    url = avatar.toDataUriSync();
  }
  return (
    <img
      {...props}
      ref={ref}
      src={url}
      className={cx("rounded-full", className)}
      alt={fullname}
    />
  );
});
