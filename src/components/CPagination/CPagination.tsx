'use client';

import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TCPaginationProps } from '@/components/CPagination/type';

/**
 * Enhanced pagination component
 * that maintains all URL query parameters when changing pages
 */
/**
 

 /* RANGE = 2 
 * 
[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20 
1 2 [3] 4 5 ... 19 20
1 2 3 [4] 5 6 ... 19 20
1 2 3 4 [5] 6 7 ... 19 20

1 2 ... 4 5 [6] 8 9 ... 19 20

1 2 ...13 14 [15] 16 17 ... 19 20

1 2 ... 14 15 [16] 17 18 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]
 */

const RANGE = 2;

const CPagination: FC<TCPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (pageNumber: number) => {
    // Create a new URLSearchParams object with the current params
    const params = new URLSearchParams(searchParams.toString());
    // Update the page parameter
    params.set('page', pageNumber.toString());
    // If limit is not set, set the default
    if (!params.has('limit')) {
      params.set('limit', itemsPerPage.toString());
    }
    // Redirect to the new URL
    router.push(`${pathname}?${params.toString()}`);
  };

  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;

    const renderDotBefore = () => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <PaginationItem key="ellipsis-before">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      return null;
    };

    const renderDotAfter = () => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <PaginationItem key="ellipsis-after">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      return null;
    };

    return Array(totalPages)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;

        // Determine when to show ellipsis
        if (
          currentPage <= RANGE * 2 + 1 &&
          pageNumber > currentPage + RANGE &&
          pageNumber < totalPages - RANGE + 1
        ) {
          return renderDotAfter();
        } else if (
          currentPage > RANGE * 2 + 1 &&
          currentPage < totalPages - RANGE * 2
        ) {
          if (pageNumber < currentPage - RANGE && pageNumber > RANGE) {
            return renderDotBefore();
          } else if (
            pageNumber > currentPage + RANGE &&
            pageNumber < totalPages - RANGE + 1
          ) {
            return renderDotAfter();
          }
        } else if (
          currentPage >= totalPages - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < currentPage - RANGE
        ) {
          return renderDotBefore();
        }

        return (
          <PaginationItem key={index}>
            <Button
              onClick={() => handlePageChange(pageNumber)}
              variant={pageNumber === currentPage ? 'outline' : 'ghost'}
              className="w-9 h-9 p-0"
            >
              {pageNumber}
            </Button>
          </PaginationItem>
        );
      });
  };

  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center md:justify-between items-center">
      <div className="hidden md:block text-sm text-gray-500">
        Showing {itemsPerPage * (currentPage - 1) + 1} to{' '}
        {Math.min(itemsPerPage * currentPage, totalItems)} of {totalItems} items
      </div>
      <Pagination className="w-max mx-0">
        <PaginationContent>
          <PaginationItem>
            <Button
              disabled={currentPage === 1}
              className="h-9 p-0 px-2"
              variant="ghost"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </Button>
          </PaginationItem>

          {renderPagination()}

          <PaginationItem>
            <Button
              disabled={currentPage === totalPages}
              className="h-9 p-0 px-2"
              variant="ghost"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next <ChevronRight className="w-5 h-5" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CPagination;
