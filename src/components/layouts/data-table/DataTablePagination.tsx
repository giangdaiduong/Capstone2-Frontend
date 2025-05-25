import { Button } from '@/components/ui/button';
import { PAGE_SIZE_OPTIONS } from '@/utils/constants';
import { Table } from '@tanstack/react-table';

function DataTablePagination<T>({ table }: { table: Table<T> }) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 px-2">
      {/* Info text */}
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <span className="hidden sm:inline">
            {table.getFilteredSelectedRowModel().rows.length} trong {table.getFilteredRowModel().rows.length} hàng được
            chọn.
          </span>
        )}
        {table.getFilteredSelectedRowModel().rows.length === 0 && (
          <span>
            <span className="hidden sm:inline">Hiển thị </span>
            {table.getRowModel().rows.length}
            <span className="hidden sm:inline"> trong {table.getFilteredRowModel().rows.length}</span>
            <span className="sm:hidden">/{table.getFilteredRowModel().rows.length}</span>
            <span className="hidden sm:inline"> kết quả</span>
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6 lg:space-x-8">
        {/* Page size selector */}
        <div className="flex items-center justify-between sm:justify-start space-x-2">
          <p className="text-sm font-medium whitespace-nowrap">
            <span className="hidden sm:inline">Số hàng mỗi trang</span>
            <span className="sm:hidden">Hàng/trang</span>
          </p>
          <select
            className="h-8 w-[70px] rounded border border-input bg-background px-3 py-1 text-sm"
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {PAGE_SIZE_OPTIONS.map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        {/* Page info */}
        <div className="flex items-center justify-center">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            <span className="hidden sm:inline">Trang </span>
            {table.getState().pagination.pageIndex + 1}
            <span className="mx-1">/</span>
            {table.getPageCount()}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-center space-x-2">
          {/* First page - hidden on mobile */}
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 md:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            title="Trang đầu"
          >
            <span className="sr-only">Trang đầu</span>
            {'<<'}
          </Button>

          {/* Previous page */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            title="Trang trước"
          >
            <span className="sr-only">Trang trước</span>
            {'<'}
          </Button>

          {/* Page numbers - only on larger screens */}
          <div className="hidden lg:flex items-center space-x-1">
            {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
              const currentPage = table.getState().pagination.pageIndex;
              const totalPages = table.getPageCount();

              let pageNumber: number;
              if (totalPages <= 5) {
                pageNumber = i;
              } else if (currentPage < 3) {
                pageNumber = i;
              } else if (currentPage > totalPages - 3) {
                pageNumber = totalPages - 5 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              if (pageNumber < 0 || pageNumber >= totalPages) return null;

              return (
                <Button
                  key={pageNumber}
                  variant={pageNumber === currentPage ? 'default' : 'outline'}
                  className="h-8 w-8 p-0"
                  onClick={() => table.setPageIndex(pageNumber)}
                >
                  {pageNumber + 1}
                </Button>
              );
            })}
          </div>

          {/* Next page */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            title="Trang sau"
          >
            <span className="sr-only">Trang sau</span>
            {'>'}
          </Button>

          {/* Last page - hidden on mobile */}
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 md:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            title="Trang cuối"
          >
            <span className="sr-only">Trang cuối</span>
            {'>>'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTablePagination;
