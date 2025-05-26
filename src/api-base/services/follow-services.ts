import type { ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts';
import { MethodAPI } from '@alvin0/http-driver/dist/utils/driver-contracts';

export enum FollowServiceIds {
  GetFollower = 'follow.getFollower',
  GetFollowing = 'follow.getFollowing',
  GetCountFolow = 'follow.getCountFolow',
  Follow = 'follow.follow',
  Unfollow = 'follow.unfollow',
}

export default [
  {
    id: FollowServiceIds.GetFollower,
    url: 'api/Follow/followers',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: FollowServiceIds.GetFollowing,
    url: 'api/Follow/following',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: FollowServiceIds.GetCountFolow,
    url: 'api/Follow/stats',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: FollowServiceIds.Follow,
    url: 'api/Follow/follow/{userId}',
    method: MethodAPI.post,
    version: 1,
  },
  {
    id: FollowServiceIds.Unfollow,
    url: 'api/Follow/unfollow/{userId}',
    method: MethodAPI.post,
    version: 1,
  },
] as ServiceApi[];
