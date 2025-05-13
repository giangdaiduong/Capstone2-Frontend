import { ReactNode } from 'react';

export type ChildrenType = {
  children: ReactNode;
};

export type BaseEntity = {
  id: string;
  createdOn: string;
  createdBy: string;
  updatedOn?: string;
  updatedBy?: string;
  isDeleted: boolean;
};
