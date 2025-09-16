'use client'

import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card'
import { Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'

interface Banner {
  _id: string
  title: string
  image: string
  isActive: boolean
  position?: number
}

interface BannerListProps {
  banners: Banner[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
  onStatusChange: (id: string) => void
  onEdit: (banner: Banner) => void
  onDelete: (id: string) => void
  onPositionChange?: (id: string, direction: 'up' | 'down') => void
}

export function BannerList({
  banners,
  currentPage,
  setCurrentPage,
  totalPages,
  onStatusChange,
  onEdit,
  onDelete,
  onPositionChange,
}: BannerListProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Banner List</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {banners?.map(banner => (
              <TableRow key={banner._id}>
                <TableCell className="font-medium">{banner.title}</TableCell>
                <TableCell>
                  <img
                    src={banner.image}
                    alt={banner.title}
                    height={400}
                    width={600}
                    className="w-20 h-10 object-cover rounded"
                  />
                </TableCell>
                <TableCell>
                  <Badge variant={banner.isActive ? 'success' : 'secondary'}>
                    {banner.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>{banner.position ?? 'N/A'}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onStatusChange(banner._id)}
                    >
                      {banner.isActive ? (
                        <ToggleRight className="h-4 w-4" />
                      ) : (
                        <ToggleLeft className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(banner)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(banner._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex items-center justify-between w-full">
        <div className="text-xs text-muted-foreground">
          Showing <strong>{(currentPage - 1) * 5 + 1}</strong> to{' '}
          <strong>{Math.min(currentPage * 5, banners.length)}</strong> Banner
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={e => {
                  e.preventDefault()
                  setCurrentPage(prev => Math.max(prev - 1, 1))
                }}
              />
            </PaginationItem>

            {[...Array(totalPages).keys()].map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page + 1 === currentPage}
                  onClick={e => {
                    e.preventDefault()
                    setCurrentPage(page + 1)
                  }}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={e => {
                  e.preventDefault()
                  setCurrentPage(prev => Math.min(prev + 1, totalPages))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  )
}
