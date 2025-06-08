import { GetAmenityResType } from '@/models/amenity.model';

export type TComboboxAmenityProps = {
  addAmenity: (amenity: GetAmenityResType) => void;
  allAmenities: GetAmenityResType[];
  filteredAvailableAmenities: GetAmenityResType[];
  open: boolean;
  setOpen: (open: boolean) => void;
};
