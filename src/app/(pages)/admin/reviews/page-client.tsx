'use client';

import { httpPageApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { DataTable } from '@/components/layouts/data-table/DataTable';
import { DataTableColumnHeader } from '@/components/layouts/data-table/DataTableColumnHeader';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { errorToast } from '@/lib/toastify';
import { IdeaType } from '@/types/IdeaTypes';
import { IdeaStatus } from '@/utils/constants';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { Eye } from 'lucide-react';
import { useState, useTransition, useEffect } from 'react';
import ReviewIdeaDialog from './components/ReviewIdeaDialog';

/**
 * Client component for displaying and managing the review of ideas.
 *
 * @param props - Contains the list of ideas to be displayed and filtered.
 * @returns A React component that renders a table of ideas with filtering and detail view functionality.
 */
const ReviewsPageClient = ({ ideas }: { ideas: IdeaType[] }) => {
  const [isPending, startTransition] = useTransition();
  const [ideaDetail, setIdeaDetail] = useState<IdeaType | null>(null);
  const [ideasFilter, setIdeasFilter] = useState<IdeaType[]>([]);
  const [status, setStatus] = useState<string>('all');

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
  const handleView = (id: string) => {
    startTransition(async () => {
      const res = await httpPageApi.execService({ id: IdeaServiceIds.GetIdeaById, params: { ideaId: id } });
      if (res.ok) {
        setIdeaDetail(res.data);
      } else {
        errorToast(res.data?.message || 'Lấy thông tin ý tưởng thất bại');
      }
    });
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
        <div className="max-w-[200px] break-words whitespace-pre-line line-clamp-2">
          {row.getValue('description')}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
      cell: ({ row }) => (
        <div className="w-[50px] text-center">
          <span className={`px-3 py-1 text-sm font-medium rounded-md ${getStatusStyle(row.original.status)}`}>
            {
              IdeaStatus.find((status: { key: string; value: string }) => status.key === row.original.status)
                ?.value || 'Chưa xác định'
            }
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'actions',
      header: () => <div className="text-center">Hành động</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 flex-col sm:flex-row justify-center items-center">
          <Button variant="outline" size="icon" onClick={() => handleView(row.original.id)}>
            <Eye />
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
      <ShowLoading isPending={isPending} />
      {ideaDetail && <ReviewIdeaDialog idea={ideaDetail} onClose={() => setIdeaDetail(null)} />}
    </div>
  );
};

export default ReviewsPageClient;

/**
 * Returns the appropriate CSS class for a given status value.
 *
 * @param status - The status key of the idea.
 * @returns A string containing the CSS class names for styling the status badge.
 */
const getStatusStyle = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-600';
    case 'approved':
      return 'bg-green-100 text-green-600';
    case 'rejected':
      return 'bg-red-100 text-red-600';
    case 'draft':
      return 'bg-gray-100 text-gray-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};
