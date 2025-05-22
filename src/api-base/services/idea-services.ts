import type { ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts';
import { MethodAPI } from '@alvin0/http-driver/dist/utils/driver-contracts';

export enum IdeaServiceIds {
  GetAllIdeas = 'idea.getAllIdeas',
  GetPublicIdeas = 'idea.getPublicIdeas',
  LikeIdea = 'idea.likeIdea',
  DislikeIdea = 'idea.dislikeIdea',
  GetIdeaById = 'idea.getIdeaById',
}

export default [
  {
    id: IdeaServiceIds.GetAllIdeas,
    url: 'v1/api/ideas',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: IdeaServiceIds.GetPublicIdeas,
    url: 'v1/api/client/Ideas',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: IdeaServiceIds.LikeIdea,
    url: 'v1/api/client/Ideas/like?ideaId={ideaId}',
    method: MethodAPI.patch,
    version: 1,
  },
  {
    id: IdeaServiceIds.DislikeIdea,
    url: 'v1/api/client/Ideas/unlike?ideaId={ideaId}',
    method: MethodAPI.patch,
    version: 1,
  },
  {
    id: IdeaServiceIds.GetIdeaById,
    url: 'v1/api/client/Ideas/{ideaId}',
    method: MethodAPI.get,
    version: 1,
  },
] as ServiceApi[];
