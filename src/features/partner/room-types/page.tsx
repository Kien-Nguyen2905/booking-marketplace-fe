'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ROUTES } from '@/constants';
import { usePartnerRoomTypesPage } from '@/features/partner/room-types/hooks';
import { RoomTypeType } from '@/models/room-type.model';
import { Eye, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const PartnerRoomTypesPage = () => {
  const { roomTypes, isLoading } = usePartnerRoomTypesPage();
  return (
    <div className="space-y-4">
      <Link
        href={ROUTES.PARTNER.ROOM_TYPES_CREATE}
        className="flex justify-end"
      >
        <Button>Add</Button>
      </Link>
      <div className="border rounded-lg h-max p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Adults</TableHead>
              <TableHead>Child</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Service Fee</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : roomTypes?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-muted-foreground"
                >
                  <>No room types added yet.</>
                </TableCell>
              </TableRow>
            ) : (
              roomTypes?.map((roomType: RoomTypeType) => (
                <TableRow key={roomType.id}>
                  <TableCell>
                    {roomType.images?.length > 0 && (
                      <div className="overflow-hidden w-[50px] h-[50px] flex items-center justify-center">
                        <Image
                          src={roomType.images[0]}
                          alt={roomType.type}
                          width={50}
                          height={50}
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{roomType.type}</TableCell>
                  <TableCell>{roomType.adults}</TableCell>
                  <TableCell>{roomType.child}</TableCell>
                  <TableCell>{roomType.area}m2</TableCell>
                  <TableCell>
                    {Math.round(roomType.serviceFeeRate * 100)}%
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <Link
                          href={ROUTES.PARTNER.ROOM_TYPES + `/${roomType.id}`}
                        >
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View detail</span>
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PartnerRoomTypesPage;
