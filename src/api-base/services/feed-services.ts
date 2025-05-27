import type { ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts';
import { MethodAPI } from '@alvin0/http-driver/dist/utils/driver-contracts';

export enum FeedServiceIds {
  GetFeeds = 'feed.getFeeds',
  ReadFeeds = 'feed.readFeeds',
  HideFeeds = 'feed.hideFeeds',
}

export default [
  {
    id: FeedServiceIds.GetFeeds,
    url: 'api/Feed/feed',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: FeedServiceIds.ReadFeeds,
    url: 'api/Feed/read/{ideaId}',
    method: MethodAPI.post,
    version: 1,
  },
  {
    id: FeedServiceIds.HideFeeds,
    url: 'api/Feed/hide/{ideaId}',
    method: MethodAPI.post,
    version: 1,
  },
] as ServiceApi[];
