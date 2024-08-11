import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useAuth } from "@/context/AuthContext";
import { useGetUserSavePosts } from "@/lib/react-query/queries";
import { Models } from "appwrite";

const Saved = () => {
  const { user } = useAuth();
  const { data: saves, isPending } = useGetUserSavePosts(user.id);
  return (
    <div className="p-6">
      <p className="heading">Saved Posts</p>
      {isPending ? (
        <Loader />
      ) : saves?.total === 0 ? (
        <p className="alert">You didn't save any post yet.</p>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {saves?.documents.map((save: Models.Document) => (
            <div
              key={save.$id}
              className="col-span-12 md:col-span-6 lg:col-span-4"
            >
              <PostCard post={save.post} postedUserId={save.post.userId.$id} showUser={true}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
