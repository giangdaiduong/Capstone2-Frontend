import type { ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts';
import { MethodAPI } from '@alvin0/http-driver/dist/utils/driver-contracts';

export enum IdeaServiceIds {
  GetAllIdeas = 'idea.getAllIdeas',
  GetPublicIdeas = 'idea.getPublicIdeas',
  LikeIdea = 'idea.likeIdea',
  DislikeIdea = 'idea.dislikeIdea',
  GetIdeaById = 'idea.getIdeaById',
  CreateIdea = 'idea.createIdea',
  UpdateIdea = 'idea.updateIdea',
  ApproveIdea = 'idea.approveIdea',
  GetIdeaByUserId = 'idea.getIdeaByUserId',
  ReportIdea = 'idea.reportIdea',
  GetTopIdeas = 'idea.getTopIdeas',
  GetIdeasSuggestion = 'idea.getIdeasSuggestion',
  RateIdea = 'idea.rateIdea',
  GetInvestorMatchIdeas = 'idea.getInvestorMatchIdeas',
  GetIdeasForInvestor = 'idea.getIdeasForInvestor',
  GetRequestIdeas = 'idea.getRequestIdeas',
  DeleteIdea = 'idea.deleteIdea',
  GetSummary = 'idea.getSummary',
}

export default [
  {
    id: IdeaServiceIds.GetAllIdeas,
    url: 'v1/api/client/Ideas/for-admin',
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
  {
    id: IdeaServiceIds.CreateIdea,
    url: 'v1/api/client/Ideas',
    method: MethodAPI.post,
    version: 1,
  },
  {
    id: IdeaServiceIds.UpdateIdea,
    url: 'v1/api/client/Ideas/{ideaId}',
    method: MethodAPI.patch,
    version: 1,
  },
  {
    id: IdeaServiceIds.ApproveIdea,
    url: 'v1/api/client/Ideas/approve?ideaId={ideaId}',
    method: MethodAPI.patch,
    version: 1,
  },
  {
    id: IdeaServiceIds.GetIdeaByUserId,
    url: 'v1/api/client/Ideas/find-by-userid',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: IdeaServiceIds.ReportIdea,
    url: 'v1/api/client/Ideas/report?ideaId={ideaId}',
    method: MethodAPI.post,
    version: 1,
  },
  {
    id: IdeaServiceIds.GetTopIdeas,
    url: 'v1/api/client/Ideas/top-rated',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: IdeaServiceIds.GetIdeasSuggestion,
    url: 'v1/api/client/Ideas/match-ideas',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: IdeaServiceIds.RateIdea,
    url: 'v1/api/client/Ideas/rate-idea',
    method: MethodAPI.post,
    version: 1,
  },
  {
    id: IdeaServiceIds.GetInvestorMatchIdeas,
    url: 'v1/api/client/Ideas/{ideaId}/match-investors',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: IdeaServiceIds.GetIdeasForInvestor,
    url: 'v1/api/client/Ideas/for-investor',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: IdeaServiceIds.GetRequestIdeas,
    url: 'v1/api/client/Ideas/request-idea',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: IdeaServiceIds.DeleteIdea,
    url: 'v1/api/client/Ideas/{id}',
    method: MethodAPI.delete,
    version: 1,
  },
  {
    id: IdeaServiceIds.GetSummary,
    url: 'v1/api/client/Ideas/summary',
    method: MethodAPI.get,
    version: 1,
  },
] as ServiceApi[];
