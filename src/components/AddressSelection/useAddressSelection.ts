import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import {
  useGetDistrictsQuery,
  useGetProvincesQuery,
  useGetWardsQuery,
} from '@/queries';

export const useAddressSelection = (form: any) => {
  const { data: provinces, isLoading: isLoadingProvinces } =
    useGetProvincesQuery();

  // react-hook-form values that should trigger dependent queries
  const provinceCode = useWatch({ control: form.control, name: 'provinceCode' });
  const districtCode = useWatch({ control: form.control, name: 'districtCode' });

  const {
    data: districts,
    isLoading: isLoadingDistricts,
  } = useGetDistrictsQuery(provinceCode);

  const {
    data: wards,
    isLoading: isLoadingWards,
  } = useGetWardsQuery(districtCode);

  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);

  const handleOpenChangeProvince = (open: boolean) => {
    setOpenProvince(open);
  };

  const handleOpenChangeDistrict = (open: boolean) => {
    setOpenDistrict(open);
  };

  const handleOpenChangeWard = (open: boolean) => {
    setOpenWard(open);
  };

  const handleProvinceChange = (value: string) => {
    // Update the province code in the form first
    form.setValue('provinceCode', +value);
    // Clear dependent selections so react-query can fetch with new params automatically
    form.setValue('districtCode', '');
    form.setValue('wardCode', '');
    handleOpenChangeProvince(false);
  };

  const handleDistrictChange = (value: string) => {
    // Update the district code in the form first
    form.setValue('districtCode', +value);
    // Clear dependent selections so react-query can fetch with new params automatically
    form.setValue('wardCode', '');
    handleOpenChangeDistrict(false);
  };

  const handleWardChange = () => {
    handleOpenChangeWard(false);
  };

  return {
    provinces:
      provinces?.data?.data.map((item) => ({
        value: item.code,
        label: item.name,
      })) || [],
    districts:
      districts?.data?.data.map((item) => ({
        value: item.code,
        label: item.name,
      })) || [],
    wards:
      wards?.data?.data.map((item) => ({
        value: item.code,
        label: item.name,
      })) || [],
    isLoadingProvinces,
    isLoadingDistricts,
    isLoadingWards,
    handleProvinceChange,
    handleDistrictChange,
    openProvince,
    openDistrict,
    openWard,
    handleOpenChangeProvince,
    handleOpenChangeDistrict,
    handleOpenChangeWard,
    handleWardChange,
  };
};
