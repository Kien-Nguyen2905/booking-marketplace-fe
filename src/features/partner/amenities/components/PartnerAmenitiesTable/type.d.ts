import { GetAmenityResType } from '@/models/amenity.mode';

export type TPartnerAmenitiesTableProps = {
  hotelAmenities: GetAmenityResType[];
  selectedType: string;
  removeAmenity: (amenityId: number) => void;
};
