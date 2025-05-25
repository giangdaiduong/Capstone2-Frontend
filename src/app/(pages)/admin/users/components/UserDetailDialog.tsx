import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserType } from '@/types/UserType';
import { Trash, ArrowLeft } from 'lucide-react';
import { formatDate } from 'date-fns';
import Image from 'next/image';

function UserDetailDialog({
  user,
  onClose,
  handleDelete,
}: {
  user: UserType;
  onClose: () => void;
  handleDelete: () => void;
}) {
  const columns = [
    {
      label: 'Họ và tên',
      value: user.fullName,
    },
    {
      label: 'Email',
      value: user.email,
    },
    {
      label: 'Số điện thoại',
      value: user.phone,
    },
    {
      label: 'Ngày sinh',
      value: formatDate(user.birthday, 'dd/MM/yyyy'),
    },
    {
      label: 'Địa chỉ',
      value: user.address,
    },
    {
      label: 'Ngày đăng ký',
      value: formatDate(user.createdOn, 'dd/MM/yyyy'),
    },
  ];

  return (
    <Dialog defaultOpen={true} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-2xl"
        onEscapeKeyDown={e => {
          e.preventDefault();
        }}
        onPointerDownOutside={e => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="relative p-2">
          <Button onClick={onClose} className="absolute left-0 top-0 bg-blue-600 hover:bg-blue-700 text-white">
            <ArrowLeft />
          </Button>
          <DialogTitle className="text-center font-bold text-2xl text-blue-800">Thông tin cá nhân</DialogTitle>
        </DialogHeader>
        <div className="p-2 flex flex-col md:flex-row gap-2">
          <div className="w-1/3 m-auto p-6">
            <Image
              src={user.avatar || '/user.webp'}
              alt="Uploaded image"
              className="rounded-lg object-contain m-auto"
              width={100}
              height={100}
            />
          </div>
          <table className="w-2/3">
            <tbody>
              {columns.map((column, index) => (
                <tr key={index}>
                  <th className="text-left">{column.label}:</th>
                  <td className="text-left">{column.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DialogFooter className="sm:justify-center my-2">
          <Button className="bg-red-600 hover:bg-red-800 text-white" type="button" onClick={handleDelete}>
            <Trash />
            Xoá tài khoản
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UserDetailDialog;
