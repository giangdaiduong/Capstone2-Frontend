import { BaseEntity } from './common';

export type CategoryType = BaseEntity & {
  name: string;
  description: string;
};
