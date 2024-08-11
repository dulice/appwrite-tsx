import { useAuth } from "@/context/AuthContext";
import {
  useDeleteSavePost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queries";
import {
  mdiHeart,
  mdiHeartOutline,
  mdiMarkerCheck,
  mdiTagOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { Models } from "appwrite";
import Loader from "./Loader";

type PostStatsProps = {
  post: Models.Document;
};

const PostStat = ({ post }: PostStatsProps) => {
  const { user } = useAuth();
  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: savePost, isPending: isSaving } = useSavePost();
  const { mutateAsync: deleteSavePost, isPending: isUnSaveing } =
    useDeleteSavePost();
  const { data: currentUser } = useGetCurrentUser();

  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const savedPost = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPost);
  }, [currentUser]);

  const handleLike = (e: SyntheticEvent) => {
    e.stopPropagation();
    const likes = [...likesList];
    const isLiked = likes.includes(user.id);
    if (isLiked) {
      likes.splice(likes.indexOf(user.id), 1);
      setIsLiked(false);
    } else {
      likes.push(user.id);
      setIsLiked(true);
    }
    likePost({ id: post.$id, likesArray: likes });
  };

  const handleSave = async (e: SyntheticEvent) => {
    e.stopPropagation();
    if (!!savedPost) {
      await deleteSavePost(savedPost.$id);
      setIsSaved(false);
    } else {
      await savePost({ post: post.$id, user: user.id });
      setIsSaved(true);
    }
  };
  return (
    <div className="flex justify-between gap-4 z-10">
      <div className="flex gap-1 text-red-500">
        <button onClick={handleLike}>
          <Icon
            path={isLiked || likesList.includes(user.id) ? mdiHeart : mdiHeartOutline}
            size={1}
          />
        </button>
        <span>{post.likes.length}</span>
      </div>
      <button onClick={handleSave}>
        {isSaving || isUnSaveing ? (
          <Loader />
        ) : (
          <Icon className="text-violet-700" path={isSaved ? mdiMarkerCheck : mdiTagOutline} size={1} />
        )}
      </button>
    </div>
  );
};

export default PostStat;
