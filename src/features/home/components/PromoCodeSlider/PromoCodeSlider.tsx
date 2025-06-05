'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Copy, Check, Gift, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePromoCodeSlider } from '@/features/home/components/PromoCodeSlider/usePromoCodeSlider';
export const mockPromoCodes = [
  {
    id: '1',
    title: 'Giảm ngay 50K',
    code: 'TVLKBANMOI',
    description: 'Áp dụng cho lần đặt đầu tiên đặt đơn trên website',
    percentage: 0.1,
  },
  {
    id: '2',
    title: '8% giảm giá Khách sạn',
    code: 'TVLKBANMOI',
    description: 'Áp dụng cho lần đặt đầu tiên trên ứng dụng Traveloka.',
    percentage: 0.08,
  },
  {
    id: '3',
    title: '8% giảm Hoạt động Du lịch',
    code: 'TVLKBANMOI',
    description: 'Áp dụng cho lần đặt đầu tiên trên ứng dụng Traveloka.',
    percentage: 0.08,
  },
  {
    id: '4',
    title: '5% giảm giá Combo',
    code: 'COMBO5',
    description: 'Áp dụng cho lần đặt đầu tiên trên ứng dụng Traveloka.',
    percentage: 0.05,
  },
  {
    id: '5',
    title: '10% giảm giá Combo',
    code: 'COMBO5',
    description: 'Áp dụng cho lần đặt đầu tiên trên ứng dụng Traveloka.',
    percentage: 0.1,
  },
];
const PromoCodeSlider = () => {
  const {
    copiedCodeId,
    isBeginning,
    isEnd,
    navigationPrevRef,
    navigationNextRef,
    paginationRef,
    onCopyCode,
    setIsBeginning,
    setIsEnd,
    setSwiper,
  } = usePromoCodeSlider();
  return (
    <div className="w-full relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center -z-10">
          <Gift className="h-6 w-6 text-[var(--blue-primary)] mr-2" />
          <h2 className="text-lg font-bold text-[var(--blue-dark)]">
            Coupons for users
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            ref={navigationPrevRef}
            variant="outline"
            size="icon"
            className={cn(
              'rounded-full h-8 w-8 border-gray-300',
              isBeginning
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:text-[var(--blue-primary)] hover:border-[var(--blue-primary)]',
            )}
            disabled={isBeginning}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            ref={navigationNextRef}
            variant="outline"
            size="icon"
            className={cn(
              'rounded-full h-8 w-8 border-gray-300',
              isEnd
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:text-[var(--blue-primary)] hover:border-[var(--blue-primary)]',
            )}
            disabled={isEnd}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            el: paginationRef.current,
          }}
          slidesPerView={'auto'}
          spaceBetween={16}
          className="w-full"
          onSwiper={(swiperInstance) => {
            setSwiper(swiperInstance);
            // @ts-ignore
            swiperInstance.params.navigation.prevEl = navigationPrevRef.current;
            // @ts-ignore
            swiperInstance.params.navigation.nextEl = navigationNextRef.current;
            // @ts-ignore
            swiperInstance.params.pagination.el = paginationRef.current;
            // Initialise modules with the new elements
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
            swiperInstance.pagination.init();
            swiperInstance.pagination.update();
          }}
          onSlideChange={(swiperInstance) => {
            setIsBeginning(swiperInstance.isBeginning);
            setIsEnd(swiperInstance.isEnd);
          }}
        >
          {mockPromoCodes.map((promo) => (
            <SwiperSlide key={promo.id} className="max-w-[320px] w-full">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <div className="w-full h-full rounded-full flex items-center justify-center bg-[var(--blue-primary)]">
                        <Gift className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm">{promo.title}</h3>
                        <span className="text-xs font-medium text-white bg-red-500 px-2 py-1 rounded-full">
                          {promo.percentage * 100}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {promo.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-[var(--blue-primary)]">
                    {promo.code}
                  </span>
                  <Button
                    onClick={() => onCopyCode(promo.code, promo.id)}
                    variant="outline"
                    size="sm"
                    className={cn(
                      'h-8 rounded-full font-medium transition-all',
                      copiedCodeId === promo.id
                        ? 'bg-green-50 text-green-600 border-green-200'
                        : 'hover:border-[var(--blue-primary)] hover:text-[var(--blue-primary)]',
                    )}
                  >
                    {copiedCodeId === promo.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          ref={paginationRef}
          className="flex justify-center items-center h-6 mt-4"
        ></div>

        {!isEnd && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md">
              <ChevronRight className="h-6 w-6 text-[var(--blue-primary)]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoCodeSlider;
