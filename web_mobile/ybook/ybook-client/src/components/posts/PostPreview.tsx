import { IconHeart, IconMessage } from "@tabler/icons-react";
import DOMPurify from "dompurify";
import { forwardRef } from "react";
import { type Post } from "../../hooks/posts/usePosts";
import cx from "classnames";
import { useSession } from "../../hooks/auth/useSession";
import { useLikePost } from "../../hooks/posts/useLikePost";
import { Link } from "react-router-dom";
import { Avatar } from "../default/Avatar";

export const PostPreview = forwardRef<HTMLDivElement, { post: Post }>(
  ({ post }, ref) => {
    const { data: session } = useSession();
    const likedByMe = post.postLikes.some(
      (like) => like.user.email === session?.email
    );
    const hasMyComments = post.postComments.some(
      (comment) => comment.user.email === session?.email
    );
    const like = useLikePost(post.id);
    return (
      <div ref={ref} className="flex flex-col gap-2 rounded-md border p-4">
        <div className="flex items-center gap-2">
          <Avatar user={post.user} />
          <span className="inline-block text-lg font-bold">
            {post.user.firstname} {post.user.lastname}
          </span>
        </div>
        <div
          className="prose prose-sm"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.htmlContent),
          }}
        />
        <hr />
        <div className="flex justify-between">
          <button
            className="text-md flex items-center py-2 pr-2"
            onClick={() => like()}
          >
            <IconHeart
              stroke={1}
              className={cx({ "fill-red-500 text-red-500": likedByMe })}
            />
            {post.postLikes.length}
          </button>
          <Link
            to={`/post/${post.id}`}
            className="text-md flex items-center py-2 pl-2"
          >
            <IconMessage
              stroke={1}
              className={cx({ "fill-slate-700 text-slate-700": hasMyComments })}
            />{" "}
            {post.postComments.length}
          </Link>
        </div>
      </div>
    );
  }
);
