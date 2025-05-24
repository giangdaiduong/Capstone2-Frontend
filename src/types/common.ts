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

export interface NavItemConfig {
  id: string;
  href: string;
  label: string;
  icon: React.ElementType<{ className?: string }>;
}

// --- Component con: NavLinkItem ---
export interface NavLinkItemProps {
  href: string;
  icon: React.ElementType<{ className?: string }>;
  isActive: boolean;
  label: string;
}

export interface DropdownMenuItemConfig {
  id: string;
  label?: string;
  icon?: React.ElementType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
  isSeparator?: boolean;
  isLabel?: boolean;
  className?: string;
}
