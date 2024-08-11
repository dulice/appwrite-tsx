import { useAuth } from "@/context/AuthContext";
import { mdiPenPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { Models } from "appwrite";
import { Link, useNavigate } from "react-router-dom";
import PostStat from "./PostStat";
import { SyntheticEvent } from "react";

type PostCardProps = {
  post: Models.Document;
  postedUserId: string;
  showUser?: boolean;
  showStats?: boolean;
};

const PostCard = ({ post, postedUserId, showUser, showStats }: PostCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (e: SyntheticEvent, route: string) => {
    e.stopPropagation();
    navigate(route);
  };
  return (
    <div className="relative">
      {postedUserId === user.id && (
        <Link
          className="absolute p-5 right-0 z-10"
          to={`/posts/${post.$id}/edit`}
        >
          <Icon path={mdiPenPlus} size={1} />
        </Link>
      )}
      <div onClick={() => navigate(`/posts/${post.$id}`)}>
        <img
          src={post.imageUrl}
          alt=""
          className="w-full object-cover hover:blur-sm transition h-[250px] rounded-lg"
        />
        <div className="absolute bottom-0 p-5 flex justify-between items-end w-full gap-2">
          <div>
            {showUser && (
              <div className="flex items-center gap-2">
                <img
                  src={post.userId.imageUrl}
                  alt=""
                  className="avatar"
                  onClick={(e) =>
                    handleNavigate(e, `/profile/${post.userId.$id}`)
                  }
                />
                <p>{post.userId.name}</p>
              </div>
            )}
          </div>
          {!showStats && <PostStat post={post} />}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
