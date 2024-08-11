import { Models } from "appwrite";
import moment from "moment";
import { Link } from "react-router-dom";

type postProps = {
    post: Models.Document
}
const UserDate = ({post}: postProps) => {
  return (
    <div className="flex gap-2 items-center">
      <Link to={`/profile/${post.userId.$id}`}>
        <img
          className="w-12 h-12 rounded-full"
          src={post.userId.imageUrl}
          alt=""
        />
      </Link>
      <div>
        <p className="font-bold">{post.userId.name}</p>
        <div className="flex text-secondary gap-2">
          <p>{moment(post.$createdAt).fromNow()}</p>•<p>{post.location}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDate;
