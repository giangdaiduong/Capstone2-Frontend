import type { ToastOptions } from 'react-toastify';
import { Bounce, toast } from 'react-toastify';

export const successToast = (message: string | undefined, options?: ToastOptions) => {
  toast.success(message, options);
};

export const errorToast = (message: string | undefined, options?: ToastOptions) => {
  toast.error(message, {
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    transition: Bounce,
    ...options,
  });
};

export const warningToast = (message: string | undefined, options?: ToastOptions) => {
  toast.warning(message, {
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Bounce,
    ...options,
  });
};

export const CloseAllToast = () => {
  toast.dismiss();
};
