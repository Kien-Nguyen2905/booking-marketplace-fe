import { LocationType } from '@/components/LocationSelector/type';
import { POPULAR_ACCOMMODATION_LIST } from '@/constants';
import { showToast } from '@/lib/toast';
import {
  haversineDistance,
  isInBoundingBox,
  removeDiacritics,
} from '@/lib/utils';
import {
  provincesWithCoordinates,
  TProvincesWithCoordinates,
} from '@/mocks/mockDistanceProvince';
import { useGetProvincesQuery } from '@/queries';
import { useEffect, useRef, useState } from 'react';

export const useLocationSelector = (
  onChange?: (location: LocationType) => void,
) => {
  const { data: provincesData, isLoading } = useGetProvincesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const modifiedProvinces =
    provincesData?.data?.data?.map((province) => ({
      id: province.code,
      name: province.name,
      code: province.code,
    })) || [];

  const popularProvinces = modifiedProvinces.filter((province) => {
    return POPULAR_ACCOMMODATION_LIST.some((popularProvince) => {
      return province.code === Number(popularProvince.provinceCode);
    });
  });

  const notInPopularProvinces = modifiedProvinces.filter((province) => {
    return !popularProvinces.some((popularProvince) => {
      return province.code === popularProvince.code;
    });
  });

  const provinces = [...popularProvinces.reverse(), ...notInPopularProvinces];

  const filteredProvinces = provinces.filter((province) => {
    const search = removeDiacritics(searchTerm.toLowerCase());
    const provinceName = removeDiacritics(province.name.toLowerCase());
    return provinceName.includes(search);
  });

  const handleSelectLocation = (province: LocationType) => {
    onChange?.({
      id: province.code,
      name: province.name,
      code: province.code,
    });
  };

  const findProvince = (userLat: number, userLon: number) => {
    const candidates = provincesWithCoordinates?.filter((province) =>
      isInBoundingBox(userLat, userLon, province.bbox),
    );

    let nearestProvince: TProvincesWithCoordinates | null = {
      _id: '',
      name: '',
      code: 0,
      codename: '',
      division_type: '',
      phone_code: 0,
      lat: 0,
      lon: 0,
      radius: 0,
      bbox: {
        minLat: 0,
        maxLat: 0,
        minLon: 0,
        maxLon: 0,
      },
    };
    let minDistance = Infinity;

    candidates.forEach((province) => {
      const distance = haversineDistance(
        userLat,
        userLon,
        province.lat,
        province.lon,
      );
      if (distance < province.radius && distance < minDistance) {
        minDistance = distance;
        nearestProvince = province;
      }
    });

    if (nearestProvince) {
      onChange?.({
        id: nearestProvince.code,
        name: nearestProvince.name,
        code: nearestProvince.code,
        lat: userLat,
        lon: userLon,
      });
    } else {
      showToast({
        type: 'error',
        message: 'Không tìm thấy tỉnh thành nào trong phạm vi.',
      });
    }
  };
  const onNearHere = () => {
    if (!navigator.geolocation) {
      showToast({
        type: 'error',
        message: 'Trình duyệt không hỗ trợ Geolocation.',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        findProvince(userLat, userLon);
      },
      (error) => {
        showToast({
          type: 'error',
          message: `Lỗi: ${error.message}`,
        });
      },
      { timeout: 10000, maximumAge: 60000, enableHighAccuracy: true },
    );
  };
  useEffect(() => {
    if (searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, []);

  console.log(provinces);
  return {
    provinces,
    filteredProvinces,
    handleSelectLocation,
    isLoading,
    searchInputRef,
    searchTerm,
    setSearchTerm,
    onNearHere,
  };
};
