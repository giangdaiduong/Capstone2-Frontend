'use client';

import { useEffect, useState, useTransition } from 'react';
import { DataTable } from '@/components/layouts/data-table/DataTable';
import { DataTableColumnHeader } from '@/components/layouts/data-table/DataTableColumnHeader';
import { Button } from '@/components/ui/button';
import { UserType } from '@/types/UserType';
import { UserRole } from '@/utils/constants';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { Eye, Trash } from 'lucide-react';
import ShowLoading from '@/components/layouts/Loading/ShowLoading';
import { httpPageApi } from '@/api-base';
import { UserServiceIds } from '@/api-base/services/user-services';
import { successToast, errorToast } from '@/lib/toastify';
import { useRouter } from 'next/navigation';
import UserDetailDialog from './components/UserDetailDialog';

const UsersPageClient = ({ users }: { users: UserType[] }) => {
  const [role, setRole] = useState<UserRole.Admin | UserRole.Investor | UserRole.Founder | null>(null);
  const [usersFilter, setUsersFilter] = useState<UserType[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [userDetail, setUserDetail] = useState<UserType | null>(null);

  useEffect(() => {
    if (role) {
      const filteredUsers = users?.filter(user => user.roleName === role);
      setUsersFilter(filteredUsers || []);
    } else {
      setUsersFilter(users || []);
    }
  }, [role, users]);

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await httpPageApi.execService({ id: UserServiceIds.DeleteUser }, { id });
      if (res.ok) {
        successToast(res.data?.message || 'Xóa người dùng thành công');
        router.refresh();
      } else {
        errorToast(res.data?.message || 'Xóa người dùng thất bại');
      }
    });
  };

  const handleView = (id: string) => {
    startTransition(async () => {
      const res = await httpPageApi.execService({ id: UserServiceIds.GetUserProfileById, params: { id } });
      if (res.ok) {
        setUserDetail(res.data);
      } else {
        errorToast(res.data?.message || 'Lấy thông tin người dùng thất bại');
      }
    });
  };

  const columns: ColumnDef<UserType>[] = [
    {
      id: 'stt',
      header: 'STT',
      cell: ({ row }) => <div className="w-[50px] text-center">{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'username',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Họ và tên" />,
      cell: ({ row }) => <div className="font-medium">{row.getValue('username')}</div>,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
      cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'createdOn',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày đăng ký" />,
      cell: ({ row }) => <div>{formatDate(row.getValue('createdOn'), 'dd/MM/yyyy')}</div>,
    },
    {
      accessorKey: 'actions',
      header: () => <div className="text-center">Hành động</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 flex-col sm:flex-row justify-center items-center">
          <Button variant="outline" size="icon" onClick={() => handleView(row.original.id)}>
            <Eye />
          </Button>
          <Button variant="destructive" size="icon" onClick={() => handleDelete(row.original.id)}>
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
        data={usersFilter}
        pageSize={10}
        emptyMessage="Không có người dùng nào."
        actions={
          <div className="flex gap-2 flex-col sm:flex-row">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setRole(UserRole.Investor)}
              disabled={role === UserRole.Investor}
            >
              Nhà đầu tư
            </Button>
            <Button
              className="bg-gray-600 hover:bg-gray-700 text-white"
              onClick={() => setRole(UserRole.Founder)}
              disabled={role === UserRole.Founder}
            >
              Ý tưởng viên
            </Button>
            <Button variant="secondary" onClick={() => setRole(null)} disabled={role === null}>
              Tất cả
            </Button>
          </div>
        }
      />
      <ShowLoading isPending={isPending} />
      {userDetail && (
        <UserDetailDialog
          user={userDetail}
          onClose={() => setUserDetail(null)}
          handleDelete={() => handleDelete(userDetail.id)}
        />
      )}
    </div>
  );
};

export default UsersPageClient;
