import { cn } from '@/lib/utils';

interface NotificationBadgeProps {
  count: number;
  children: React.ReactNode;
  className?: string;
  max?: number;
}

export function NotificationBadge({ count, children, className, max = 99 }: NotificationBadgeProps) {
  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <div className="relative inline-flex">
      {children}
      {count > 0 && (
        <span
          className={cn(
            'absolute -top-2 -right-2 flex items-center justify-center',
            'min-w-[1.25rem] h-5 rounded-full bg-red-500 text-white text-xs font-bold px-1',
            className
          )}
        >
          {displayCount}
        </span>
      )}
    </div>
  );
}
