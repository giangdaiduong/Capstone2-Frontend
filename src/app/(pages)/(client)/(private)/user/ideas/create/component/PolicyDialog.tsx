import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Policy } from '@/lib/utils';

function PolicyDialog({ onClose, onAgree }: { onClose: () => void; onAgree: () => void }) {
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
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-2xl text-blue-800">
            Nội dung điều khoản & điều kiện của nền tảng
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {Policy.map((p, index) => (
            <div key={index}>
              <h2 className="text-lg font-bold text-blue-700">
                {index + 1}. {p.title}
              </h2>
              <ul className={p.agree ? 'pl-5' : 'list-disc pl-5'}>
                {p.child.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    {p.agree ? <span className="mt-0.5 text-green-600">✅</span> : null}
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <DialogFooter className="sm:justify-between my-2">
          <DialogClose asChild onClick={onClose}>
            <Button type="button" variant="secondary">
              Huỷ
            </Button>
          </DialogClose>
          <Button type="button" onClick={onAgree}>
            Đồng ý
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PolicyDialog;
