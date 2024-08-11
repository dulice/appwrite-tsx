import { useAuth } from "@/context/AuthContext";
import { mdiPenPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { Models } from "appwrite";
import React, { SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostStat from "./PostStat";

type postListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const PostCardList = ({ posts, showUser, showStats }: postListProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (e: SyntheticEvent, route: string) => {
    e.stopPropagation();
    navigate(route);
  };
  return (
    <div className="grid grid-cols-12 gap-6">
      {posts.map((post) => (
        <div className="relative col-span-12 sm:col-span-6 md:col-span-4" key={post.$id}>
          {post.userId.$id === user.id && (
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
      ))}
    </div>
  );
};

export default PostCardList;
