'use client';

import React, { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import useReviewHotel from './useReviewHotel';
import { THotelReviewProps } from './type';
import { StartRating } from '@/components';

const HotelReview: FC<THotelReviewProps> = ({ reviewData = [] }) => {
  const { displayedReviews, averageRating, totalReviews } =
    useReviewHotel(reviewData);

  return (
    <div className="py-6">
      {/* Review header */}
      {reviewData.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Guest Reviews</h2>
            <div className="flex items-center gap-2">
              <StartRating rating={averageRating} />
              <span className="font-semibold text-[16px]">
                {averageRating}/5
              </span>
              <span className="text-gray-500 text-[16px]">
                ({totalReviews} reviews)
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Review list */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <Card key={review.id} className="shadow-sm border-gray-200">
            <CardContent className="p-5 flex gap-10">
              {/* Review header with user info */}
              <div className="flex justify-between items-start w-[340px] mb-4">
                <div className="flex items-start gap-3">
                  <div className="user-avatar w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    {review.user.fullName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{review.user.fullName}</h3>
                    <StartRating size={16} rating={review.rating} />
                    <span className="text-gray-500 text-xs">
                      {new Date(review.createdAt || '').toLocaleDateString(
                        'vi-VN',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )}
                    </span>
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HotelReview;
