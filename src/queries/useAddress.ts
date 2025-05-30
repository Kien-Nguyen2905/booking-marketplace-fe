import { useQuery } from '@tanstack/react-query';
import addressServices from '@/services/address/addressServices';

export const useGetProvincesQuery = () => {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: () => addressServices.getProvinces(),
  });
};

export const useGetDistrictsQuery = (provinceCode: string) => {
  return useQuery({
    queryKey: ['districts', provinceCode],
    queryFn: () => addressServices.getDistricts(provinceCode),
    enabled: !!provinceCode,
  });
};

export const useGetWardsQuery = (districtCode: string) => {
  return useQuery({
    queryKey: ['wards', districtCode],
    queryFn: () => addressServices.getWards(districtCode),
    enabled: !!districtCode,
  });
};
