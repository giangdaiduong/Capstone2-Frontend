import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function CustomPagination({ totalPages, currentPage, onPageChange, isLoading = false }: PaginationProps) {
  const disabledClass = 'pointer-events-none opacity-50';

  /* ---------- Helpers ---------- */
  // Tạo mảng các trang cần hiển thị
  const buildPages = (): (number | 'ellipsis')[] => {
    const raw = new Set<number>();

    raw.add(1);
    raw.add(totalPages);
    raw.add(currentPage);

    if (currentPage - 1 > 1) raw.add(currentPage - 1);
    if (currentPage + 1 < totalPages) raw.add(currentPage + 1);

    const sorted = Array.from(raw).sort((a, b) => a - b);

    const result: (number | 'ellipsis')[] = [];
    sorted.forEach((page, idx) => {
      if (idx && page - (sorted[idx - 1] as number) > 1) {
        result.push('ellipsis');
      }
      result.push(page);
    });
    return result;
  };

  const pages = buildPages();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={currentPage <= 1 || isLoading ? disabledClass : undefined}
            onClick={e => {
              e.preventDefault();
              if (!isLoading && currentPage > 1) onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {pages.map((item, idx) =>
          item === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <span className="px-3 text-sm opacity-60 select-none">…</span>
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                isActive={currentPage === item}
                className={isLoading ? disabledClass : undefined}
                onClick={e => {
                  e.preventDefault();
                  if (!isLoading && currentPage !== item) onPageChange(item);
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            className={currentPage >= totalPages || isLoading ? disabledClass : undefined}
            onClick={e => {
              e.preventDefault();
              if (!isLoading && currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
