//Todo: USER
export type IUser = {
  id: string;
  accountId: string;
  name: string;
  username: string;
  email: string;
  imageUrl?: string;
  bio?: string;
};

export type IUpdateUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  file: File[];
  imageUrl?: URL;
  imageId?: string;
  bio?: string;
};

export type INewUser = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type IFollow = {
  curentId: string;
  followId: string;
}

//Todo: Post
export type INewPost = {
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
  userId: string;
};

export type IUpdatePost = {
  $id: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
  imageUrl: URL;
  imageId: string;
};

export type IRELATEDPOSTS = {
  tags: string[];
};

export type ILikePost = {
  id: string;
  likesArray: string[];
};

export type ISavePost = {
  post: string;
  user: string;
};
