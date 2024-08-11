import { ID, Query } from "appwrite";
import { account, appWriteConfig, avatars, databases, stroage } from "./config";
import {
  IFollow,
  ILikePost,
  INewPost,
  INewUser,
  IRELATEDPOSTS,
  ISavePost,
  IUpdatePost,
  IUpdateUser,
  IUser,
} from "@/types";
import { toast } from "@/components/ui/use-toast";

export async function login(email: string, password: string) {
  const user = await account.createEmailPasswordSession(email, password);
  return user;
}

export async function signup(user: INewUser) {
  try {
    const authUser = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    const avatarUrl = avatars.getInitials(user.name);
    if (authUser) {
      await databases.createDocument(
        appWriteConfig.databasesId,
        appWriteConfig.usersCollectionId,
        ID.unique(),
        {
          accountId: authUser.$id,
          name: authUser.name,
          username: user.username,
          email: authUser.email,
          imageUrl: avatarUrl,
        }
      );
    }
    return authUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signout() {
  await account.deleteSession("current");
}

export async function updateUser(user: IUpdateUser) {
  const hasFileToUpload = user.file.length > 0;
  let image = {
    imageUrl: user.imageUrl,
    imageId: user.imageId,
  }

  if(hasFileToUpload) {
    const file = await uploadFile(user.file[0]);
    if(!file) throw Error;
    const previewFile = getFileUrl(file.$id);
    if(!previewFile) return deleteFile(file.$id);
    image = {...image, imageUrl: previewFile, imageId: file.$id};
  }
  try {
    const updateUser = await databases.updateDocument(
      appWriteConfig.databasesId,
      appWriteConfig.usersCollectionId,
      user.id,
      {
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    )
    if(!updateUser) throw Error;
    if(image.imageId && hasFileToUpload) {
      deleteFile(image.imageId);
    }
    return updateUser;
  } catch (error) {
    console.log(error);
  }
  
}

export async function getCurrentUser() {
  try {
    const getUser = await account.get();
    const user = await databases.listDocuments(
      appWriteConfig.databasesId,
      appWriteConfig.usersCollectionId,
      [Query.equal("accountId", getUser.$id)]
    );
    return user.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(id: string) {
  try {
    const user = await databases.getDocument(
      appWriteConfig.databasesId,
      appWriteConfig.usersCollectionId,
      id
    );
    if (!user) throw Error;
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers(id: string) {
  try {
    const users = await databases.listDocuments(
      appWriteConfig.databasesId,
      appWriteConfig.usersCollectionId,
      [Query.notEqual("accountId", [id])]
    );
    if (!users) throw Error;
    return users;
  } catch (error) {
    console.log(error);
  }
}

//todo: FOLLOW
export async function followUser({curentId, followId}: IFollow) {
  try {
    const user = await databases.createDocument(
      appWriteConfig.databasesId,
      appWriteConfig.followsCollectionId,
      ID.unique(),
      {
        user: followId,
        followUser: curentId
      }
    )
    if(!user) throw Error;
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function UnfollowUser(id: string) {
  try {
    const user = await databases.deleteDocument(
      appWriteConfig.databasesId,
      appWriteConfig.followsCollectionId,
      id
    )
    if(!user) throw Error;
    return {status: 'ok'};
  } catch (error) {
    console.log(error);
  }
}

//Todo: POST
export async function getPosts({pageParam}: {pageParam: number}) {
  const queryies: any[] = [Query.orderDesc("$createdAt"), Query.limit(9)];
  if(pageParam) {
    queryies.push(Query.cursorAfter(pageParam.toString()));
  }
  const posts = await databases.listDocuments(
    appWriteConfig.databasesId,
    appWriteConfig.postsCollectionId,
    queryies,
  );
  if (!posts) throw Error;
  return posts;
}

export async function getPostById(id: string) {
  const post = await databases.getDocument(
    appWriteConfig.databasesId,
    appWriteConfig.postsCollectionId,
    id
  );
  return post;
}

export async function getRelatedPost({ tags }: IRELATEDPOSTS) {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databasesId,
      appWriteConfig.postsCollectionId,
      [
        Query.contains("tags", tags),
        Query.limit(6),
      ]
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function searchPosts(search: string) {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databasesId,
      appWriteConfig.postsCollectionId,
      [Query.search("caption", search)]
    )
    if(!posts) throw Error;
    return posts;
  } catch (error) {
    
  }
}

export async function createPost(post: INewPost) {
  if (!post.userId) return;
  try {
    const image = await uploadFile(post.file[0]);
    if (!image) throw Error;
    const filePreview = getFileUrl(image.$id);
    const tags = tagsFormat(post?.tags || "");

    const newPost = await databases.createDocument(
      appWriteConfig.databasesId,
      appWriteConfig.postsCollectionId,
      ID.unique(),
      {
        caption: post.caption,
        imageUrl: filePreview,
        imageId: image.$id,
        location: post.location,
        tags,
        userId: post.userId,
      }
    );
    if (!newPost) {
      await stroage.deleteFile(image.bucketId, image.$id);
      toast({ title: "Something went wrong" });
    }
    return newPost;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePost(post: IUpdatePost) {
  try {
    const hasFiletoUpdate = post.file.length > 0;

    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFiletoUpdate) {
      const file = await uploadFile(post.file[0]);
      if (!file) throw Error;
      const FilePreview = getFileUrl(file.$id);
      if (!FilePreview) return deleteFile(file?.$id);
      image = { ...image, imageUrl: FilePreview, imageId: file.$id };
    }

    const tags = tagsFormat(post?.tags || "");
    const updatePost = await databases.updateDocument(
      appWriteConfig.databasesId,
      appWriteConfig.postsCollectionId,
      post.$id,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags,
      }
    );
    if(image.imageId && hasFiletoUpdate) {
      deleteFile(image.imageId)
    }
    return updatePost;
  } catch (error) {
    console.log(error);
  }
}

export async function likePost({ id, likesArray }: ILikePost) {
  try {
    const post = await databases.updateDocument(
      appWriteConfig.databasesId,
      appWriteConfig.postsCollectionId,
      id,
      { likes: likesArray }
    );
    if (!post) throw Error;
    return post;
  } catch (error) {
    console.log(error);
  }
}

//todo: SAVE
export async function createSavePost(data: ISavePost) {
  try {
    const newSavePost = await databases.createDocument(
      appWriteConfig.databasesId,
      appWriteConfig.savesCollectionId,
      ID.unique(),
      data
    );
    if (!newSavePost) throw Error;
    return newSavePost;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSavePost(id: string) {
  try {
    const deletePost = await databases.deleteDocument(
      appWriteConfig.databasesId,
      appWriteConfig.savesCollectionId,
      id
    );
    if (!deletePost) throw Error;
    return { status: "success" };
  } catch (error) {
    console.log(error);
  }
}

export async function userSavedPosts(id: string) {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databasesId,
      appWriteConfig.savesCollectionId,
      [Query.equal("user", [id])]
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log(error);
  }
}

//todo: FILE

export async function uploadFile(file: File) {
  try {
    const image = await stroage.createFile(
      appWriteConfig.storageId,
      ID.unique(),
      file
    );
    if (!image) throw Error;
    return image;
  } catch (error) {
    console.log(error);
  }
}
export function getFileUrl(id: string) {
  try {
    const filePreview = stroage.getFileView(appWriteConfig.storageId, id);
    if (!filePreview) throw Error;
    return filePreview;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(id: string) {
  try {
    await stroage.deleteFile(appWriteConfig.storageId, id);
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export function tagsFormat(tags: string) {
  return tags.replace(/ /g, "").split(",") || [];
}
