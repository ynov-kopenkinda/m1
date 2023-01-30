import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Loader } from "../components/default/Loader";
import { PostPreview } from "../components/posts/PostPreview";
import { usePosts } from "../hooks/posts/usePosts";

const HomePage = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);
  return (
    <div className="flex flex-col gap-2">
      <h1 className="mb-4 text-4xl font-black">Home</h1>
      {data?.pages.map((page, pageIdx) =>
        page.posts.map((post, postIdx) => (
          <PostPreview
            post={post}
            key={post.id}
            ref={
              pageIdx === data.pages.length - 1 &&
              postIdx === page.posts.length - 1
                ? ref
                : undefined
            }
          />
        ))
      )}
      {isFetchingNextPage && (
        <div className="flex h-12 items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default HomePage;
