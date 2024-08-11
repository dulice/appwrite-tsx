import { IFollow } from './../../types/index';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, createSavePost, deleteSavePost, followUser, getCurrentUser, getPostById, getPosts, getRelatedPost, getUserById, getUsers, likePost, login, searchPosts, signout, signup, UnfollowUser, updatePost, updateUser, userSavedPosts } from "../appwrite/api";
import { ILikePost, INewPost, INewUser, IRELATEDPOSTS, ISavePost, IUpdatePost, IUpdateUser } from "@/types";
import { QueryKeys } from "./queryKey";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user: INewUser) => signup(user),
  });
};

export const useUserLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
  });
};

export const useUserLogout = () => {
  return useMutation({
    mutationFn: signout,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_USER]
      })
    }
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryFn: getCurrentUser,
    queryKey: [QueryKeys.GET_USER, QueryKeys.GET_POST],
  })
}

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: [QueryKeys.GET_USER, id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  })
}

export const useGetUsers = (id: string) => {
  return useQuery({
    queryFn: () => getUsers(id),
    queryKey: [QueryKeys.GET_USERS, id],
  })
}
//todo: FOLLOW
export const useFollowUser = () => {
  return useMutation({
    mutationFn: ({curentId, followId}: IFollow) => followUser({curentId, followId}),
    mutationKey: [QueryKeys.GET_USER],
  })
}

export const useUnFollowUser = () => {
  return useMutation({
    mutationFn: (id: string) => UnfollowUser(id),
    mutationKey: [QueryKeys.GET_USERS],
  })
}

//todo: POST
export const useCreatePost = () => {
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
  });
};

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QueryKeys.GET_POSTS],
    queryFn: getPosts as any,
    initialPageParam: 0,
    getNextPageParam: (lastPage: any) => {
      if(lastPage && lastPage.documents.length === 0) {
        return null;
      }
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    }
  })
}

export const useGetPostById = (id: string) => {
  return useQuery({
    queryKey: [QueryKeys.GET_POST, id],
    queryFn: () => getPostById(id),
  })
}

export const useGetSearchPosts = (search: string) => {
  return useQuery({
    queryKey: [QueryKeys.GET_POSTS, search],
    queryFn: () => searchPosts(search),
    enabled: !!search,
  });
}

export const useGetRelatedPosts = ({tags}: IRELATEDPOSTS) => {
  return useQuery({
    queryKey: [QueryKeys.GET_RELATED_POSTS, tags],
    queryFn: () => getRelatedPost({tags}),
    enabled: !!tags,
  })
}

export const useUpdatePost = () => {
  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    mutationKey: [QueryKeys.GET_POST]
  })
}

export const useLikePost = () => {
  return useMutation({
    mutationFn: ({id, likesArray}: ILikePost) => likePost({id, likesArray}),
    mutationKey: [QueryKeys.GET_POST]
  })
}

//todo: SAVE
export const useSavePost = () => {
  return useMutation({
    mutationFn: (data: ISavePost) => createSavePost(data),
    mutationKey: [QueryKeys.GET_POST],
  })
}

export const useDeleteSavePost = () => {
  return useMutation({
    mutationFn: (id: string) => deleteSavePost(id),
    mutationKey: [QueryKeys.GET_POST]
  })
}

export const useGetUserSavePosts = (id: string) => {
  return useQuery({
    queryKey: [QueryKeys.GET_POSTS, QueryKeys.GET_USER],
    queryFn: () => userSavedPosts(id),
  })
}