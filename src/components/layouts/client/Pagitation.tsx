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

  /**
   * Hàm trợ giúp để xây dựng mảng các trang cần hiển thị, bao gồm dấu ba chấm.
   * Logic này đảm bảo luôn hiển thị trang đầu, trang cuối, và các trang xung quanh trang hiện tại.
   */
  const buildPages = (): (number | 'ellipsis')[] => {
    const pagesToShow: (number | 'ellipsis')[] = [];
    const maxVisiblePages = 5; // Số lượng trang tối đa muốn hiển thị trực tiếp (bao gồm cả 1 và totalPages)
    const sidePages = Math.floor((maxVisiblePages - 2) / 2); // Số trang hiển thị ở mỗi bên của trang hiện tại

    // Luôn thêm trang đầu tiên
    if (totalPages > 0) {
      pagesToShow.push(1);
    }

    // Tính toán phạm vi các trang xung quanh trang hiện tại
    let startPage = Math.max(2, currentPage - sidePages);
    let endPage = Math.min(totalPages - 1, currentPage + sidePages);

    // Điều chỉnh phạm vi nếu currentPage ở gần đầu hoặc cuối
    if (currentPage - 1 < sidePages) {
      // Nếu currentPage ở gần đầu
      endPage = Math.min(totalPages - 1, maxVisiblePages - 1);
    } else if (totalPages - currentPage < sidePages + 1) {
      // Nếu currentPage ở gần cuối
      startPage = Math.max(2, totalPages - (maxVisiblePages - 2));
    }

    // Thêm dấu ba chấm nếu có khoảng trống giữa trang 1 và startPage
    if (startPage > 2) {
      pagesToShow.push('ellipsis');
    }

    // Thêm các trang trong phạm vi tính toán
    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    // Thêm dấu ba chấm nếu có khoảng trống giữa endPage và totalPages
    if (endPage < totalPages - 1) {
      pagesToShow.push('ellipsis');
    }

    // Luôn thêm trang cuối cùng (nếu có nhiều hơn 1 trang và chưa được thêm)
    if (totalPages > 1 && !pagesToShow.includes(totalPages)) {
      pagesToShow.push(totalPages);
    }

    // Loại bỏ các số trang trùng lặp và giữ nguyên vị trí dấu ba chấm (ellipsis)
    const uniqueSortedPages: (number | 'ellipsis')[] = [];
    pagesToShow.forEach(item => {
      if (!uniqueSortedPages.includes(item)) {
        uniqueSortedPages.push(item);
      }
    });

    // Xử lý lại ellipsis nếu có 2 ellipsis cạnh nhau
    const finalPages: (number | 'ellipsis')[] = [];
    uniqueSortedPages.forEach((item, index) => {
      if (item === 'ellipsis' && index > 0 && finalPages[finalPages.length - 1] === 'ellipsis') {
        // Bỏ qua nếu có 2 ellipsis liên tiếp
        return;
      }
      // Chỉ push nếu item là 'ellipsis' hoặc number
      if (item === 'ellipsis' || typeof item === 'number') {
        finalPages.push(item);
      }
    });

    return finalPages;
  };

  // Tạo mảng các trang để hiển thị
  const pages = buildPages();

  // Hàm xử lý click chung cho các nút phân trang
  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    // Chỉ thay đổi trang nếu không trong trạng thái tải và trang khác với trang hiện tại
    if (!isLoading && currentPage !== page) {
      onPageChange(page);
    }
  };

  // Hàm xử lý click cho nút Previous
  const handlePreviousClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoading && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Hàm xử lý click cho nút Next
  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoading && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Nút Previous */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={currentPage <= 1 || isLoading ? disabledClass : undefined}
            onClick={handlePreviousClick}
          />
        </PaginationItem>

        {/* Render các số trang hoặc dấu ba chấm */}
        {pages.map((item, idx) =>
          item === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <span className="px-3 text-sm opacity-60 select-none">…</span>
            </PaginationItem>
          ) : (
            <PaginationItem key={item.toString()}>
              <PaginationLink
                href="#"
                isActive={currentPage === item}
                className={isLoading ? disabledClass : undefined}
                onClick={e => handlePageClick(e, item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Nút Next */}
        <PaginationItem>
          <PaginationNext
            href="#"
            className={currentPage >= totalPages || isLoading ? disabledClass : undefined}
            onClick={handleNextClick}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
