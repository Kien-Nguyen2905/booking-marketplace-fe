import { GetAmenitiesResType } from '@/models/amenity.model';
import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';

const amenityServices = {
  getAmenities: () => {
    return instance.get<SuccessResponse<GetAmenitiesResType>>(`/amenities`);
  },
};
export default amenityServices;
