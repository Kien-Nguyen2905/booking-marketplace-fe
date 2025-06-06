'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import useReviewHotel from './useReviewHotel';
import { THotelReviewProps } from './type';

const HotelReview: FC<THotelReviewProps> = ({ reviewData = [] }) => {
  const { displayedReviews, averageRating, totalReviews } =
    useReviewHotel(reviewData);

  return (
    <div className="py-6">
      {/* Review header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Guest Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={20}
                  className={`${
                    index < Math.floor(averageRating)
                      ? 'fill-[#FFD700] text-[#FFD700]'
                      : 'fill-none text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold">{averageRating.toFixed(1)}/5</span>
            <span className="text-gray-500">({totalReviews} reviews)</span>
          </div>
        </div>
      </div>
      {/* Review list */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <Card key={review.id} className="shadow-sm border-gray-200">
            <CardContent className="p-5 flex gap-10">
              {/* Review header with user info */}
              <div className="flex justify-between items-start w-[340px] mb-4">
                <div className="flex items-center gap-3">
                  <div className="user-avatar w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    {review.user.fullName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{review.user.fullName}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      {/* Rating stars */}
                      <div className="flex">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            size={16}
                            className={`${
                              index < Math.round(review.rating / 2)
                                ? 'fill-[#FFD700] text-[#FFD700]'
                                : 'fill-none text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500">
                        {new Date(review.createdAt || '').toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full">
                {' '}
                {/* Review content */}
                <div className="mb-4">
                  {review.title && (
                    <h4 className="font-medium mb-1">{review.title}</h4>
                  )}
                  <p className="text-gray-700">{review.content}</p>
                </div>
                {/* Review images if available */}
                {review.image && (
                  <div className="mb-4">
                    <div className="h-[120px] md:h-[180px] relative">
                      <div className="relative h-full w-[220px] rounded-md overflow-hidden">
                        <Image
                          src={review.image}
                          alt={`Review image ${review.id}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HotelReview;
