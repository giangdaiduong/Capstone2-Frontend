import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.ComponentProps<'input'> {
  icon?: React.ReactNode;
}

function Input({ icon, className, type = 'text', ...props }: InputProps) {
  return (
    <div className={cn('relative flex items-center', icon && 'group')}>
      {icon && (
        <span
          className="pointer-events-none absolute left-3 h-5 w-5 flex items-center text-muted-foreground"
          data-slot="icon"
        >
          {icon}
        </span>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
          'dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent',
          // Nếu có icon, thêm padding-left để hiện icon không chồng text
          icon ? 'pl-10' : 'px-3',
          'py-1 text-base shadow-xs transition-[color,box-shadow] outline-none',
          'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'md:text-sm',
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
