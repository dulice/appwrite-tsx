import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import PostStat from "@/components/shared/PostStat";
import Tags from "@/components/shared/Tags";
import UserDate from "@/components/shared/UserDate";
import { useGetPostById, useGetRelatedPosts } from "@/lib/react-query/queries";
import { mdiArrowLeftBold } from "@mdi/js";
import Icon from "@mdi/react";
import { Models } from "appwrite";
import { useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, isPending } = useGetPostById(id || "");
  const { data: relatedPosts, isPending: isLoadingPosts } = useGetRelatedPosts({
    tags: post?.tags,
  });
  return (
    <div className="mx-4 md:mx-10 my-4 space-y-4">
      <button onClick={() => navigate(-1)}>
        <Icon path={mdiArrowLeftBold} size={1} />
      </button>
      <div>
        {isPending || !post ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 card mr-6">
            <img src={post.imageUrl} alt="" className="rounded-lg" />
            <div className="flex flex-col justify-between h-full">
              <div>
                <UserDate post={post} />
                <div className="h-[1px] bg-slate-600 my-4"></div>
                <p>{post.caption}</p>
                <Tags tags={post.tags} />
              </div>
              <PostStat post={post} />
            </div>
          </div>
        )}
      </div>
      <div>
        <p className="heading">More Related Posts</p>
        {isPending || isLoadingPosts ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
            {relatedPosts?.documents.filter(curPost => curPost.$id !== post?.$id).map((post: Models.Document) => (
              <PostCard key={post.$id} post={post} postedUserId={post.userId.$id}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
