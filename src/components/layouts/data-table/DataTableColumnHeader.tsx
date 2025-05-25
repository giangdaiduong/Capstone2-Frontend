'use client';

import type React from 'react';
import type { Column } from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const handleSort = () => {
    const currentSort = column.getIsSorted();

    if (currentSort === false) {
      column.toggleSorting(false);
    } else if (currentSort === 'asc') {
      column.toggleSorting(true);
    } else {
      column.clearSorting();
    }
  };

  const getSortIcon = () => {
    const currentSort = column.getIsSorted();

    if (currentSort === 'asc') {
      return <ArrowUp className="ml-2 h-4 w-4" />;
    } else if (currentSort === 'desc') {
      return <ArrowDown className="ml-2 h-4 w-4" />;
    } else {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button variant="ghost" size="sm" className="-ml-3 h-8 hover:bg-accent" onClick={handleSort}>
        <span>{title}</span>
        {getSortIcon()}
      </Button>
    </div>
  );
}
