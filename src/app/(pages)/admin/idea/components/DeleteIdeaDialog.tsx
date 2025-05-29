import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const DeleteIdeaDialog = ({
  ideaId,
  onClose,
  handleDelete,
}: {
  ideaId: string;
  onClose: () => void;
  handleDelete: (id: string) => void;
}) => {
  return (
    <Dialog defaultOpen={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa ý tưởng</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-500">Bạn có chắc chắn muốn xoá ý tưởng này không?</div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button variant="destructive" onClick={() => handleDelete(ideaId)}>
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteIdeaDialog;
