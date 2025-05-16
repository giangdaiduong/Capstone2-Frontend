'use client';

import { Loader2 } from 'lucide-react';

interface ShowLoadingProps {
  isPending: boolean;
}

export default function ShowLoading({ isPending }: ShowLoadingProps) {
  if (!isPending) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <Loader2 className="h-14 w-14 text-white animate-spin" />
    </div>
  );
}
