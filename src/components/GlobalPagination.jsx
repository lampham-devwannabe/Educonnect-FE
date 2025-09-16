'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { CardFooter } from '@/components/ui/card'

export default function GlobalPagination({
  currentPage,
  totalPages,
  pageSize = 10,
  totalItems,
  currentPageDataLength,
  onPageChange,
}) {
  return (
    <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-2">
      <div className="text-xs text-muted-foreground">
        Showing{' '}
        <strong>
          {currentPageDataLength ? (currentPage - 1) * pageSize + 1 : 0}
        </strong>{' '}
        to{' '}
        <strong>{(currentPage - 1) * pageSize + currentPageDataLength}</strong>{' '}
        of <strong>{totalItems}</strong> data
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={e => {
                e.preventDefault()
                if (currentPage > 1) onPageChange(currentPage - 1)
              }}
              className={
                currentPage === 1 ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pageNumber = i + 1
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  onClick={e => {
                    e.preventDefault()
                    onPageChange(pageNumber)
                  }}
                  isActive={currentPage === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          {totalPages > 5 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={e => {
                    e.preventDefault()
                    onPageChange(totalPages)
                  }}
                  isActive={currentPage === totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={e => {
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
