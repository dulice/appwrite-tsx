import { useAuth } from "@/context/AuthContext";
import UserCard from "@/components/shared/UserCard";
import { useGetUsers } from "@/lib/react-query/queries";
import Loader from "./Loader";
import { Models } from "appwrite";

const RightSidebar = () => {
  const { user } = useAuth();
  const { data: users, isPending } = useGetUsers(user.accountId);
  return (
    <div className="mr-6">
      <p className="heading">Top Creators</p>
      {isPending ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {users?.documents.map((user: Models.Document) => (
            <UserCard key={user.$id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
