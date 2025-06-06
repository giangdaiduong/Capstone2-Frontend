import { z } from 'zod';

export type IdeaType = {
  id: string;
  ideaCode: string;
  title: string;
  description: string;
  initiator: string;
  category: string;
  categoryId: string;
  imageUrls: string;
  status: string;
  stage: string;
  region: string;
  copyrightStatus: boolean;
  copyrightCertificate?: string;
  price?: number;
  isForSale?: boolean;
  isPublic?: boolean;
  collaborationType?: string;
  investor: string;
  investmentDate?: string | Date;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalRatings: number;
  createdOn: string | Date;
  createdBy: string;
  updatedOn?: string | Date;
  updatedBy?: string;
  isDeleted: boolean;
  isApproved: boolean;
  comments: IdeaCommentType[];
};

export type GetIdeaResponseType = {
  items: IdeaType[];
  total: number;
  pageIndex: number;
  pageSize: number;
};

export type IdeaCommentType = {
  id: string;
  content: string;
  user?: string;
  parentCommentId?: string;
  replies?: IdeaCommentType[];
};

export const createIdeaSchema = z.object({
  title: z
    .string({ required_error: 'Tiêu đề không được để trống' })
    .max(250, 'Tiêu đề tối đa 250 ký tự')
    .nonempty('Tiêu đề không được để trống'),
  categoryId: z.string(),
  description: z
    .string({ required_error: 'Nội dung chi tiết không được để trống' })
    .nonempty('Nội dung chi tiết không được để trống'),
  copyrightStatus: z.boolean(),
  copyrightCertificate: z.string().optional().nullable(),
  initiatorId: z.string(),
  imageUrls: z.string().optional().nullable(),
  createdBy: z.string(),
  status: z.string(),
  collaborationType: z.string().optional().nullable(),
  price: z.number({ invalid_type_error: 'Giá phải là số' }).optional().nullable(),
  isForSale: z.boolean(),
  isPublic: z.boolean(),
  stage: z.string(),
  region: z.string(),
});

export const editIdeaSchema = z.object({
  title: z
    .string({ required_error: 'Tiêu đề không được để trống' })
    .max(250, 'Tiêu đề tối đa 250 ký tự')
    .nonempty('Tiêu đề không được để trống'),
  categoryId: z.string(),
  description: z
    .string({ required_error: 'Nội dung chi tiết không được để trống' })
    .nonempty('Nội dung chi tiết không được để trống'),
  imageUrls: z.string().optional().nullable(),
  copyrightStatus: z.boolean(),
  copyrightCertificate: z.string().optional().nullable(),
  price: z.number({ invalid_type_error: 'Giá phải là số' }).optional().nullable(),
  isForSale: z.boolean(),
  status: z.string(),
  isPublic: z.boolean(),
});

export type IdeaSuggestionType = {
  ideaId: string;
  title: string;
  fullName: string;
  region: string;
  score: number;
};

export type InvestorType = {
  investor: {
    id: string;
    fullName: string;
    email: string;
    preferredIndustries: string;
    preferredStages: string;
    fundingRangeMin: number;
    fundingRangeMax: number;
    preferredRegions: string;
  };
  score: number;
};

export type GetSummaryResponseType = {
  totalIdeas: number;
  totalFounders: number;
  totalInvestors: number;
};
