'use client';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Copy, Check, Gift, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePromoCodeSlider } from '@/features/home/components/PromoCodeSlider/usePromoCodeSlider';
import PromoCodeSliderSkeleton from './PromoCodeSliderSkeleton';

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
    coupons,
    isLoading,
  } = usePromoCodeSlider();
  return (
    <div className="w-full relative -z-10">
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
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{
            clickable: true,
            el: paginationRef.current,
          }}
          autoplay={{
            delay: 1000,
            pauseOnMouseEnter: true,
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
            // Initialize modules with the new elements
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
            swiperInstance.pagination.init();
            swiperInstance.pagination.update();
          }}
          onSlideChange={(swiperInstance) => {
            setIsBeginning(swiperInstance.isBeginning);
            setIsEnd(swiperInstance.isEnd);
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 3.5,
            },
          }}
        >
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <SwiperSlide
                    key={`skeleton-${index}`}
                    className={`lg:max-w-[350px] w-full ${isLoading && 'mr-4'}`}
                  >
                    <PromoCodeSliderSkeleton />
                  </SwiperSlide>
                ))
            : coupons &&
              coupons?.length > 0 &&
              coupons?.map((coupon) => (
                <SwiperSlide
                  key={coupon.id}
                  className="lg:max-w-[350px] w-full"
                >
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-gray-100 flex items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--blue-primary)]">
                          <Gift className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 w-full">
                        <div className="flex items-center justify-between w-full">
                          <h3 className="font-medium text-sm truncate line-clamp-1">
                            {coupon.title}
                          </h3>
                          <span className="text-xs font-medium text-white bg-red-500 px-2 py-1 rounded-full">
                            {Math.round(coupon.percentage * 100)}%
                          </span>
                        </div>
                        <p className="text-xs">Available: {coupon.available}</p>
                        <p className="text-xs text-gray-500 truncate line-clamp-1">
                          {coupon.description}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-[var(--blue-primary)]">
                        {coupon.code}
                      </span>
                      <Button
                        onClick={() =>
                          onCopyCode(coupon.code, coupon.id.toString())
                        }
                        variant="outline"
                        size="sm"
                        className={cn(
                          'h-8 rounded-full font-medium transition-all',
                          copiedCodeId === coupon.id.toString()
                            ? 'bg-green-50 text-green-600 border-green-200'
                            : 'hover:border-[var(--blue-primary)] hover:text-[var(--blue-primary)]',
                        )}
                      >
                        {copiedCodeId === coupon.id.toString() ? (
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

        {!isLoading && !isEnd && (
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
