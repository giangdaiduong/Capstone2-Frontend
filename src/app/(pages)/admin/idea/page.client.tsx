'use client';

import { httpPageApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { DataTable } from '@/components/layouts/data-table/DataTable';
import { DataTableColumnHeader } from '@/components/layouts/data-table/DataTableColumnHeader';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { errorToast, successToast } from '@/lib/toastify';
import { IdeaType } from '@/types/IdeaTypes';
import { IdeaStatus } from '@/utils/constants';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { Trash } from 'lucide-react';
import { useState, useTransition, useEffect } from 'react';
import DeleteIdeaDialog from './components/DeleteIdeaDialog';
import { useRouter } from 'next/navigation';

/**
 * Client component for displaying and managing the review of ideas.
 *
 * @param props - Contains the list of ideas to be displayed and filtered.
 * @returns A React component that renders a table of ideas with filtering and detail view functionality.
 */
const IdeaPageClient = ({ ideas }: { ideas: IdeaType[] }) => {
  const [isPending, startTransition] = useTransition();
  const [ideasFilter, setIdeasFilter] = useState<IdeaType[]>([]);
  const [status, setStatus] = useState<string>('all');
  const [ideaId, setIdeaId] = useState<string>('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  /**
   * Filters the ideas list based on the selected status.
   */
  useEffect(() => {
    if (status && status !== 'all') {
      setIdeasFilter(ideas?.filter(idea => idea.status === status) || []);
    } else {
      setIdeasFilter(ideas || []);
    }
  }, [status, ideas]);

  /**
   * Fetches and displays the details of a selected idea.
   *
   * @param id - The ID of the idea to be fetched.
   */
  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await httpPageApi.execService({ id: IdeaServiceIds.DeleteIdea, params: { id: id } });
      if (res.ok && res.data?.flag) {
        successToast(res.data?.message || 'Xóa ý tưởng thành công');
        router.refresh();
        setIdeaId('');
        setIsDeleteDialogOpen(false);
      } else {
        errorToast(res.data?.message || 'Xóa ý tưởng thất bại');
      }
    });
  };

  const handleOpenDeleteDialog = (id: string) => {
    setIdeaId(id);
    setIsDeleteDialogOpen(true);
  };

  /**
   * Column definitions for the DataTable component.
   */
  const columns: ColumnDef<IdeaType>[] = [
    {
      accessorKey: 'title',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tên ý tưởng" />,
      cell: ({ row }) => <div className="font-medium whitespace-pre-line break-words">{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'initiator',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tên người tạo" />,
      cell: ({ row }) => <div className="w-[50px] text-center">{row.getValue('initiator')}</div>,
    },
    {
      accessorKey: 'createdOn',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày tạo" />,
      cell: ({ row }) => (
        <div className="w-[50px] text-center">{formatDate(row.getValue('createdOn'), 'dd/MM/yyyy')}</div>
      ),
    },
    {
      accessorKey: 'description',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mô tả" />,
      cell: ({ row }) => (
        <div className="max-w-[200px] break-words whitespace-pre-line line-clamp-2">{row.getValue('description')}</div>
      ),
    },
    {
      accessorKey: 'category',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Lĩnh vực" />,
      cell: ({ row }) => <div className="w-[50px] text-center">{row.original.category}</div>,
    },
    {
      accessorKey: 'actions',
      header: () => <div className="text-center">Hành động</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 flex-col sm:flex-row justify-center items-center">
          <Button variant="destructive" size="icon" onClick={() => handleOpenDeleteDialog(row.original.id)}>
            <Trash />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={ideasFilter}
        pageSize={10}
        emptyMessage="Không có ý tưởng nào."
        actions={
          <div className="flex gap-2 flex-col sm:flex-row">
            <Select onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {IdeaStatus.map((status: { key: string; value: string }) => (
                  <SelectItem key={status.key} value={status.key}>
                    {status.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
      />
      {isDeleteDialogOpen && (
        <DeleteIdeaDialog ideaId={ideaId} onClose={() => setIsDeleteDialogOpen(false)} handleDelete={handleDelete} />
      )}
      <ShowLoading isPending={isPending} />
    </div>
  );
};

export default IdeaPageClient;
