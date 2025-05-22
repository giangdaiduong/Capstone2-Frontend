export type IdeaType = {
  id: string;
  ideaCode: string;
  title: string;
  description: string;
  initiator: string;
  category: string;
  imageUrls: string;
  status: string;
  copyrightStatus: boolean;
  copyrightCertificate?: string;
  price?: number;
  isForSale?: boolean;
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
  userComment?: string;
  parentCommentId?: string;
  replies?: IdeaCommentType[];
};
