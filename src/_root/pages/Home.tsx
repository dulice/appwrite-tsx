import Loader from "@/components/shared/Loader";
import PostStat from "@/components/shared/PostStat";
import RightSidebar from "@/components/shared/RightSidebar";
import Tags from "@/components/shared/Tags";
import UserDate from "@/components/shared/UserDate";
import { useAuth } from "@/context/AuthContext";
import { useGetPosts } from "@/lib/react-query/queries";
import { Models } from "appwrite";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const { ref, inView } = useInView();
  const {
    data: posts,
    hasNextPage,
    fetchNextPage,
    isPending: isPendingPost,
  } = useGetPosts();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        {isPendingPost ? (
          <Loader />
        ) : (
          <div className="h-auto sm:h-screen overflow-y-scroll p-6 scrollbar">
            {posts?.pages.map((posts, index) => (
              <div key={index}>
                {posts.documents.map((post: Models.Document) => (
                  <div key={post.$id} className="card space-y-2 mb-4">
                    <UserDate post={post} />
                    <p>{post.caption}</p>
                    <Tags tags={post.tags} />
                    <Link to={`/posts/${post.$id}`}>
                      <img
                        src={post.imageUrl}
                        alt=""
                        className="rounded-lg h-[200px] w-full object-cover"
                      />
                    </Link>
                    <PostStat post={post} />
                  </div>
                ))}
              </div>
            ))}
            {hasNextPage && (
              <div className="my-4" ref={ref}>
                <Loader />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
