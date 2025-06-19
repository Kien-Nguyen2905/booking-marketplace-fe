'use client';
import { TStartRatingProps } from '@/components/StartRating/type';
import { Star } from 'lucide-react';
import React, { FC, useState } from 'react';

const StartRating: FC<TStartRatingProps> = ({
  rating,
  size = 20,
  interactive = false,
  onChange,
  maxRating = 5,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null);
    }
  };

  const currentRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="flex gap-[2px]">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          size={size}
          className={`${
            index < Math.floor(currentRating)
              ? 'fill-[#FFD700] text-[#FFD700]'
              : 'fill-none text-gray-300'
          } ${interactive ? 'cursor-pointer transition-colors' : ''}`}
          onClick={interactive ? () => handleClick(index) : undefined}
          onMouseEnter={interactive ? () => handleMouseEnter(index) : undefined}
          onMouseLeave={interactive ? handleMouseLeave : undefined}
        />
      ))}
    </div>
  );
};

export default StartRating;
