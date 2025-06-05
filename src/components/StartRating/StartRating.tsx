import { Star } from 'lucide-react';
import React from 'react';

const StartRating = ({
  rating,
  size = 20,
}: {
  rating: number;
  size?: number;
}) => {
  return (
    <div className="flex gap-[2px]">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={size}
          className={`${
            index < Math.floor(rating)
              ? 'fill-[#FFD700] text-[#FFD700]'
              : 'fill-none text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default StartRating;
