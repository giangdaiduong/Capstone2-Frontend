import type { ReactNode } from 'react';
import { type ToastTransition } from 'react-toastify';
import { errorToast } from '@/lib/toastify'; // Assuming this is your custom wrapper around react-toastify's toast.error

type ErrorComponentProps = {
  /** The error message or component to display. */
  error: ReactNode;
  /**
   * The type of error display.
   * 'text' for inline text, 'toast' for a React-Toastify notification.
   * @default 'text'
   */
  type?: 'text' | 'toast';
  /** Optional Tailwind CSS classes to apply to the error text container. */
  className?: string;
  /**
   * Options specific to React-Toastify when `type` is 'toast'.
   * See React-Toastify documentation for all available options.
   */
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

/**
 * A versatile component for displaying error messages as inline text or a toast notification.
 *
 * @param {ErrorComponentProps} props - The properties for the ErrorComponent.
 * @returns {ReactNode | null} The error display or null if no error.
 */
function ErrorComponent({ error, type = 'text', className, toastOptions }: ErrorComponentProps) {
  // If there's no error, don't render anything.
  if (!error) {
    return null;
  }

  // Handle different error display types.
  switch (type) {
    case 'text':
      // Render error as inline text with customizable styling.
      return (
        <div className={`text-red-500 text-sm ${className || ''}`} role="alert">
          {error}
        </div>
      );
    case 'toast':
      // Display error as a toast notification.
      // Ensure the error message is a string for toastify, or handle ReactNode within your errorToast utility.
      errorToast(error as string, { ...toastOptions });
      return null; // Toasts are self-managed, so this component doesn't render anything.
    default:
      // Fallback in case an unknown type is passed.
      console.warn(`Unknown error type: ${type}. Defaulting to text display.`);
      return (
        <div className={`text-red-500 text-sm ${className || ''}`} role="alert">
          {error}
        </div>
      );
  }
}

export default ErrorComponent;