'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import Image from 'next/image'

export function BannerList({
  banners,
  currentPage,
  setCurrentPage,
  totalPages,
  onStatusChange,
  onEdit,
  onDelete,
  onPositionChange,
}) {
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
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    height={400}
                    width={600}
                    className="w-20 h-10 object-cover rounded"
                  ></Image>
                </TableCell>
                <TableCell>
                  <Badge variant={banner.isActive ? 'success' : 'secondary'}>
                    {banner.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>{banner.position || 'N/A'}</TableCell>
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
                    {/* <div className="flex flex-col">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onPositionChange(banner.id, "up")}
                        disabled={banner.position === 1}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onPositionChange(banner.id, "down")}
                        disabled={banner.position === banners.length}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{(currentPage - 1) * 5 + 1}</strong> to{' '}
          <strong>{(currentPage - 1) * 5 + 5}</strong> Banner
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              />
            </PaginationItem>
            {[...Array(totalPages).keys()].map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage(prev => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  )
}
