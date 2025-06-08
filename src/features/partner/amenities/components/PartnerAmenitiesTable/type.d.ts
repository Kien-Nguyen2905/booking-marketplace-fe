import { GetAmenityResType } from '@/models/amenity.model';

export type TPartnerAmenitiesTableProps = {
  hotelAmenities: GetAmenityResType[];
  selectedType: string;
  removeAmenity: (amenityId: number) => void;
};
