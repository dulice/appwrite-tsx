import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Models } from "appwrite";
import {
  useFollowUser,
  useGetCurrentUser,
  useUnFollowUser,
} from "@/lib/react-query/queries";
import { useAuth } from "@/context/AuthContext";
import Loader from "./Loader";
import { useEffect, useState } from "react";

type userProps = {
  user: Models.Document;
};
const UserCard = ({ user }: userProps) => {
  const [following, setFollowing] = useState(false);

  const { mutateAsync: followUser, isPending: isFollowing } = useFollowUser();
  const { mutateAsync: UnfollowUser, isPending: isUnFollowing } =
    useUnFollowUser();
  const { data: currentUser } = useGetCurrentUser();

  const followings = currentUser?.followings.find(
    (following: Models.Document) => following.user.$id === user.$id
  );

  useEffect(() => {
    setFollowing(!!followings);
  },[currentUser]);

  const handleFollow = () => {
    if (following) {
      UnfollowUser(followings.$id);
      setFollowing(false);
    } else {
      followUser({ curentId: currentUser?.$id || "", followId: user.$id });
      setFollowing(true);
    }
  };

  return (
    <div className="card flex flex-col items-center gap-1">
      <Link to={`/profile/${user.$id}`}>
        <img src={user.imageUrl} alt="" className="avatar" />
      </Link>
      <p>{user.name}</p>
      <p className="text-secondary">@{user.username}</p>
      {isFollowing || isUnFollowing ? (
        <Button>
          <Loader />
        </Button>
      ) : (
        <Button
          onClick={handleFollow}
          className={following ? "" : "btn-primary"}
        >
          {following ? "Following" : "Follow"}
        </Button>
      )}
    </div>
  );
};

export default UserCard;
