import type { ReactNode } from 'react';

import { type ToastTransition } from 'react-toastify';

import { errorToast } from '@/lib/toastify';

type ErrorComponentProps = {
  error: ReactNode;
  type?: 'text' | 'toast';
  className?: string;
  toastOptions?: {
    position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
    autoClose?: number;
    hideProgressBar?: boolean;
    closeOnClick?: boolean;
    pauseOnHover?: boolean;
    draggable?: boolean;
    progress?: number | undefined;
    transition?: ToastTransition | undefined;
    theme?: 'light' | 'dark' | 'colored';
  };
};

function ErrorComponent({ error, type = 'text', className, toastOptions }: ErrorComponentProps) {
  if (!error) return null;

  switch (type) {
    case 'text':
      return <div className={`text-red-500 text-ms ${className}`}>{error}</div>;
    case 'toast':
      errorToast(error as string, { ...toastOptions });

    default:
      return null;
  }
}

export default ErrorComponent;
