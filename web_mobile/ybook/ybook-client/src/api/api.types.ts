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

export type ApiCancelFriendRequestResponse = {
  success: boolean;
};

export type ApiRequestFriendResponse = {
  success: boolean;
};

export type ApiGetSuggestedFriendsResponse = User[];

export type ApiGetFriendRequestsResponse = User[];

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
