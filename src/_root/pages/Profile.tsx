import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queries";
import { mdiAccountEdit, mdiHeart, mdiImage } from "@mdi/js";
import Icon from "@mdi/react";
import { Models } from "appwrite";
import { useNavigate, useParams } from "react-router-dom";

const TabPosts = ({ user }: { user: Models.Document }) => {
  return (
    <div className="my-6">
      <Tabs defaultValue="posts">
        <TabsList className="bg-slate-800">
          <TabsTrigger
            value="posts"
            className="text-violet-800 data-[state=active]:bg-violet-700 data-[state=active]:text-white"
          >
            <Icon path={mdiImage} className="mr-2" size={1} />
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="liked"
            className="text-violet-800 data-[state=active]:bg-violet-700 data-[state=active]:text-white"
          >
            <Icon path={mdiHeart} className="text-red-500 mr-2" size={1} />
            Post Liked
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {user.posts.length === 0 ? (
            <div className="alert">You didn't upload any posts.</div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {user.posts.map((post: Models.Document) => (
                <PostCard key={post.$id} post={post} postedUserId={user.$id} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="liked">
          {user.liked.length === 0 ? (
            <div className="alert">You didn't like any posts yet!</div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {user.liked.map((post: Models.Document) => (
                <PostCard
                  key={post.$id}
                  post={post}
                  postedUserId={user.$id}
                  showUser={true}
                  showStats={true}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const { data: user, isPending } = useGetUserById(id || "");
  
  return (
    <div className="m-6">
      {isPending || !user ? (
        <Loader />
      ) : (
        <div>
          {currentUser.id === user.$id && (
            <Button
              onClick={() => navigate(`/profile/${user.$id}/edit`)}
              className="float-right bg-slate-700"
            >
              <Icon path={mdiAccountEdit} size={1} className="mr-2" />
              Edit Profile
            </Button>
          )}
          <div className="flex items-center gap-4">
            <img
              src={user.imageUrl}
              alt=""
              className="rounded-full w-28 h-28"
            />
            <div className="space-y-2">
              <p className="text-xl font-bold">{user.name}</p>
              <p className="text-secondary">@{user.username}</p>
              <p>{user.bio}</p>
            </div>
          </div>
          <Tabs defaultValue="post">
            <TabsList className="bg-transparent text-white">
              <TabsTrigger value="post" className="tab-active">
                <div className="flex gap-2">
                  <span>{user.posts.length}</span>
                  <span>posts</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="followers" className="tab-active">
                <div className="flex gap-2">
                  <span>{user.followers.length}</span>
                  <span>Followers</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="followings" className="tab-active">
                <div className="flex gap-2">
                  <span>{user.followings.length}</span>
                  <span>Following</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="post">
              <TabPosts user={user} />
            </TabsContent>
            <TabsContent value="followers">
              {user.followers.length === 0 ? (
                <div className="alert">No Followers</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {user.followers.map((follower: Models.Document) => (
                    <UserCard user={follower.followUser} key={follower.$id}/>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="followings">
              {user.followings.length === 0 ? (
                <div className="alert">No Following</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {user.followings.map((following: Models.Document) => (
                    <UserCard user={following.user} key={following.$id}/>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Profile;
