import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import PostCardList from "@/components/shared/PostCardList";
import { Input } from "@/components/ui/input";
import { useGetPosts, useGetSearchPosts } from "@/lib/react-query/queries";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Models } from "appwrite";
import { useDebounce } from "@/lib/utils";

type searchProps = {
  isSearching: boolean;
  searchPosts: any;
};

const SearchPosts = ({ isSearching, searchPosts }: searchProps) => {
  return (
    <div>
      {isSearching ? (
        <Loader />
      ) : searchPosts.length === 0 ? (
        <div className="alert">No posts found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {searchPosts.map((post: Models.Document) => (
            <PostCard
              post={post}
              postedUserId={post.userId.$id}
              showUser={true}
              key={post.$id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const RecentPosts = () => {
  const { ref, inView } = useInView();
  const {
    data: posts,
    hasNextPage,
    fetchNextPage,
    isPending: isPendingPost,
  } = useGetPosts();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      {isPendingPost ? (
        <Loader />
      ) : (
        <div>
          {posts?.pages.map((post, index) => (
            <div key={index}>
              <PostCardList posts={post.documents} />
            </div>
          ))}
          {hasNextPage && (
            <div className="my-4" ref={ref}>
              <Loader />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Explore = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const debounceSearch = useDebounce(searchValue, 500);
  const { data: searchPosts, isPending: isSearching } =
    useGetSearchPosts(debounceSearch);

  return (
    <div className="p-6">
      <div>
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
          className="input mb-6"
        />
      </div>
      {searchValue ? (
        <SearchPosts
          isSearching={isSearching}
          searchPosts={searchPosts?.documents}
        />
      ) : (
        <RecentPosts />
      )}
    </div>
  );
};

export default Explore;
