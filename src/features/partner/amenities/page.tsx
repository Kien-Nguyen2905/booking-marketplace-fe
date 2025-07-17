'use client';
import { usePartnerAmenitiesPage } from '@/features/partner/amenities/hooks';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components';
import {
  ComboboxAmenity,
  PartnerAmenitiesTable,
} from '@/features/partner/amenities/components';
import { AMENITY_CATEGORY_FILTER } from '@/constants';

const PartnerAmenitiesPage = () => {
  const {
    hotelAmenities,
    allAmenities,
    addAmenity,
    removeAmenity,
    handleSubmit,
    isSubmitting,
    open,
    setOpen,
    selectedType,
    setSelectedType,
    filteredAvailableAmenities,
    isLoading,
  } = usePartnerAmenitiesPage();
  if (isLoading) return <LoadingButton />;
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div className="flex gap-2">
            <div className="w-full md:w-72">
              <ComboboxAmenity
                addAmenity={addAmenity}
                allAmenities={allAmenities}
                filteredAvailableAmenities={filteredAvailableAmenities}
                open={open}
                setOpen={setOpen}
              />
            </div>
            <div className="flex gap-2">
              {AMENITY_CATEGORY_FILTER.map((item) => (
                <Button
                  key={item.value}
                  variant={selectedType === item.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType(item.value)}
                  className="h-full"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => handleSubmit()}
              disabled={isSubmitting}
              className="w-[90px] h-9 relative"
            >
              {isSubmitting ? <LoadingButton /> : 'Save'}
            </Button>
          </div>
        </div>
      </div>
      <PartnerAmenitiesTable
        hotelAmenities={hotelAmenities}
        selectedType={selectedType}
        removeAmenity={removeAmenity}
      />
    </div>
  );
};

export default PartnerAmenitiesPage;
