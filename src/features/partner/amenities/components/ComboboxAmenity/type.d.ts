import { GetAmenityResType } from '@/models/amenity.mode';

export type TComboboxAmenityProps = {
  addAmenity: (amenity: GetAmenityResType) => void;
  allAmenities: GetAmenityResType[];
  filteredAvailableAmenities: GetAmenityResType[];
  open: boolean;
  setOpen: (open: boolean) => void;
};
