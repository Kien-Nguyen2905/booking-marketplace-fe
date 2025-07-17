import { Card, CardContent } from '@/components/ui/card';
import { HOTEL_TYPE, MAP_HOTEL_TYPE, RATING_LIST } from '@/constants';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { StartRating } from '@/components/StartRating';
import { Button } from '@/components/ui/button';
import { RotateCcw, Trash2 } from 'lucide-react';
import { useHotelSideBar } from './useHotelSideBar';

export const HotelSidebar = () => {
  const {
    selectedType,
    selectedRating,
    handleTypeChange,
    handleRatingChange,
    resetTypeFilter,
    resetRatingFilter,
    resetAllFilters,
    isActiveFilters,
  } = useHotelSideBar();

  return (
    <div className="space-y-6 w-[300px] mr-10 sticky top-[150px]">
      <Card className="shadow-sm border-gray-100">
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-lg">Filter</h2>
            {isActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetAllFilters}
                className="h-8 text-xs"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset
              </Button>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">
                Accommodation Type
              </h3>
              {selectedType && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetTypeFilter}
                  className="h-6 px-2 text-xs"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            <div className="h-max pr-4 space-y-2">
              {Object.entries(HOTEL_TYPE).map(([key, value]) => (
                <div
                  key={key}
                  className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                    selectedType === value ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleTypeChange(value)}
                >
                  <Checkbox
                    id={`type-${value}`}
                    checked={selectedType === value}
                    onCheckedChange={() => handleTypeChange(value)}
                    className="mr-2"
                  />
                  <Label
                    htmlFor={`type-${value}`}
                    className="cursor-pointer flex-1 font-medium"
                  >
                    {MAP_HOTEL_TYPE[value]}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">Star Rating</h3>
              {selectedRating && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetRatingFilter}
                  className="h-6 px-2 text-xs"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {RATING_LIST.map((rating) => (
                <div
                  key={rating}
                  className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                    selectedRating === rating.toString()
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleRatingChange(rating.toString())}
                >
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRating === rating.toString()}
                    onCheckedChange={() =>
                      handleRatingChange(rating.toString())
                    }
                    className="mr-2"
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="cursor-pointer flex-1 flex items-center"
                  >
                    <StartRating rating={rating} size={16} />
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
