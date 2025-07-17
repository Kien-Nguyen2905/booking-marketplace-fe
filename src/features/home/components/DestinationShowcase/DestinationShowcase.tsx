'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useDestinationShowcase } from '@/features/home/components/DestinationShowcase/useDestinationShowcase';
import { getHotelUrl } from '@/lib/utils';

const DestinationShowcase = () => {
  const {
    destinations,
    paginationRef,
    nextBtnRef,
    prevBtnRef,
    setIsBeginning,
    setSwiper,
  } = useDestinationShowcase();

  return (
    <motion.div
      className="w-full relative py-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl md:text-2xl font-bold">
          Top destinations in Vietnam
        </h2>
      </motion.div>

      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            el: paginationRef.current,
          }}
          slidesPerView={1.2}
          spaceBetween={16}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 },
            1280: { slidesPerView: 5.2 },
          }}
          className="w-full"
          onSwiper={(swiperInstance) => {
            setSwiper(swiperInstance);
            // @ts-ignore
            swiperInstance.params.navigation.prevEl = prevBtnRef.current;
            // @ts-ignore
            swiperInstance.params.navigation.nextEl = nextBtnRef.current;
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
          }}
        >
          {destinations?.map((destination) => (
            <SwiperSlide key={destination?.provinceCode} className="w-full">
              <Link
                href={getHotelUrl({
                  provinceCode: destination?.provinceCode || '',
                })}
                className="group"
              >
                <div className="relative rounded-lg overflow-hidden mb-3 aspect-[1/1]">
                  <Image
                    src={destination?.imageUrl || ''}
                    alt={destination?.name || ''}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium text-center">{destination?.name}</h3>
                <p className="text-gray-500 text-sm text-center">
                  {destination?.accommodations} accommodations
                  {/* {(Math.random() * 1000).toFixed(0)} accommodations */}
                </p>
              </Link>
            </SwiperSlide>
          ))}

          <motion.div
            ref={paginationRef}
            className="flex justify-center items-center h-6 mt-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          ></motion.div>

          <Button
            ref={prevBtnRef}
            variant="outline"
            size="icon"
            className="absolute hidden lg:flex left-0 top-[40%] -translate-y-1/2 rounded-full h-10 w-10 bg-white/80 backdrop-blur-sm shadow-md z-10 border-gray-200"
          >
            <ChevronLeft className="h-5 w-5 text-[var(--blue-primary)]" />
          </Button>

          <Button
            ref={nextBtnRef}
            variant="outline"
            size="icon"
            className="absolute hidden lg:flex right-0 top-[40%] -translate-y-1/2 rounded-full h-10 w-10 bg-white/80 backdrop-blur-sm shadow-md z-10 border-gray-200"
          >
            <ChevronRight className="h-5 w-5 text-[var(--blue-primary)]" />
          </Button>
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export default DestinationShowcase;
