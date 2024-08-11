import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useAuth } from "@/context/AuthContext";
import { useGetUsers } from "@/lib/react-query/queries";
import { Models } from "appwrite";

const People = () => {
  const { user } = useAuth();
  const { data: users, isPending } = useGetUsers(user.accountId);
  return (
    <div className="p-6">
      <p className="heading">All Users</p>
      {isPending ? (
        <Loader />
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-4">
            {users?.documents.map((user: Models.Document) => (
              <UserCard key={user.$id} user={user}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default People;
