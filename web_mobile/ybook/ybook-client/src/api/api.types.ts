export type ApiS3UploadResponse = {
  url: string;
  key: string;
};

export type ApiS3GetResourceResponse = {
  url: string;
};

export type ApiCreateUserResponse = {
  user: User;
};

export type ApiGetFriendsResponse = User[];

export type ApiGetUsersResponse = User[];

export type ApiGetUserResponse = {
  user: User & { blockedByUsers: User[] };
  friends: User[];
  pending: Friendship | null;
};

export type ApiCancelFriendRequestResponse = {
  success: boolean;
};

export type ApiRequestFriendResponse = {
  success: boolean;
};

export type ApiGetSuggestedFriendsResponse = User[];

export type ApiGetFriendRequestsResponse = User[];

export type ApiCreatePostResponse = Post;

export type ApiGetPostsResponse = {
  posts: Post[];
  page: number;
  pages: number;
};

export type ApiGetPostResponse = Post;

export type ApiGetSessionResponse = {
  session: Session | null;
};

export type ApiGetNotificationsResponse = Notification[];

// Types

export type Session = {
  name: string;
  surname: string;
  email: string;
  user: User;
};

export type Post = {
  id: number;
  createdAt: string;
  updatedAt: string;
  htmlContent: string;
  userId: number;
  user: User;
  postComments: PostCommentElement[];
  postLikes: PostCommentElement[];
  postAttachments: any[];
};

export type PostCommentElement = {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  postId: number;
  text?: string;
  user: User;
};

export type User = {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstname: string;
  lastname: string;
  email: string;
  avatarS3Key: string | null;
  coverPicS3Key: string | null;
  config: null;
};

export type Notification = {
  id: number;
  createdAt: string;
  updatedAt: string;
  read: boolean;
  friendshipId: number;
  conversationMessageId: null;
  friendship: Friendship;
  message: null;
};

export type Friendship = {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  fromId: number;
  toId: number;
};
