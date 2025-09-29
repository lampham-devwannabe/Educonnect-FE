import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'
import { CardFooter } from './ui/card'

type GlobalPaginationProps = {
  currentPage: number
  totalPages: number
  pageSize?: number
  totalItems: number
  currentPageDataLength: number
  onPageChange: (page: number) => void
}

const GlobalPagination: React.FC<GlobalPaginationProps> = ({
  currentPage,
  totalPages,
  pageSize = 10,
  totalItems,
  currentPageDataLength,
  onPageChange,
}: GlobalPaginationProps) => {
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 'ellipsis', totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        'ellipsis',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    }

    return [
      1,
      'ellipsis',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'ellipsis',
      totalPages,
    ]
  }

  const pageNumbers = getPageNumbers()

  return (
    <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-2">
      {/* Hiển thị số dòng */}
      <div className="text-xs text-muted-foreground">
        Showing{' '}
        <strong>
          {currentPageDataLength ? (currentPage - 1) * pageSize + 1 : 0}
        </strong>{' '}
        to{' '}
        <strong>{(currentPage - 1) * pageSize + currentPageDataLength}</strong>{' '}
        of <strong>{totalItems}</strong> data
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                if (currentPage > 1) onPageChange(currentPage - 1)
              }}
              className={
                currentPage === 1 ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>

          {/* Dynamic Pages */}
          {pageNumbers.map((page, i) =>
            page === 'ellipsis' ? (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault()
                    onPageChange(page)
                  }}
                  isActive={currentPage === page}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                if (currentPage < totalPages) onPageChange(currentPage + 1)
              }}
              className={
                currentPage === totalPages
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </CardFooter>
  )
}

export default GlobalPagination
