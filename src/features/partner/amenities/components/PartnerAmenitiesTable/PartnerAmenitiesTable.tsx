import React, { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { GetAmenityResType } from '@/models/amenity.mode';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { TPartnerAmenitiesTableProps } from '@/features/partner/amenities/components/PartnerAmenitiesTable/type';

const PartnerAmenitiesTable: FC<TPartnerAmenitiesTableProps> = ({
  hotelAmenities,
  selectedType,
  removeAmenity,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2">Name</TableHead>
          <TableHead className="w-1/3">Type</TableHead>
          <TableHead className="w-1/3">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {hotelAmenities.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={3}
              className="text-center py-6 text-muted-foreground"
            >
              {hotelAmenities.length === 0 ? (
                <>
                  No amenities added yet. Use the search box above to add
                  amenities.
                </>
              ) : (
                <>
                  No {selectedType.toLowerCase()} amenities found. Select a
                  different type or add more amenities.
                </>
              )}
            </TableCell>
          </TableRow>
        ) : (
          hotelAmenities.map((amenity: GetAmenityResType) => (
            <TableRow key={amenity.id}>
              <TableCell className="flex items-center gap-2">
                {amenity.name}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{amenity.category}</span>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAmenity(amenity.id)}
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default PartnerAmenitiesTable;
