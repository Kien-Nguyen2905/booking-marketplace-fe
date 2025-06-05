import { LocationType } from '@/components/LocationSelector/type';
import { useGetProvincesQuery } from '@/queries';
import { useEffect, useRef, useState } from 'react';

export const useLocationSelector = (
  onChange: (location: LocationType) => void,
) => {
  const { data: provincesData, isLoading } = useGetProvincesQuery();

  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const provinces =
    provincesData?.data?.data?.map((province) => ({
      id: province.code,
      name: province.name,
      code: province.code,
    })) || [];

  const filteredProvinces = provinces.filter((province) => {
    const search = searchTerm.toLowerCase();
    return province.name.toLowerCase().includes(search);
  });

  const handleSelectLocation = (province: LocationType) => {
    onChange({
      id: province.code,
      name: province.name,
      code: province.code,
    });
  };

  useEffect(() => {
    if (searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, []);
  return {
    filteredProvinces,
    handleSelectLocation,
    isLoading,
    searchInputRef,
    searchTerm,
    setSearchTerm,
  };
};
