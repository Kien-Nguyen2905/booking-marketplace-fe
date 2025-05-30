'use client';
import React from 'react';
import { ButtonBack, Loading, LoadingButton } from '@/components';
import { usePartnerPageDetail } from '@/features/admin/partners/hooks';
import { format } from 'date-fns';
import { HOTEL_STATUS, PartnerStatus, ROUTES } from '@/constants';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
const PartnerPageDetail = () => {
  const {
    partner,
    hotel,
    isLoading,
    isSubmitting,
    provinceList,
    districtList,
    wardList,
    districtListHotel,
    wardListHotel,
    handleUpdateStatusPartner,
    statusSubmit,
  } = usePartnerPageDetail();

  if (isLoading) {
    return <Loading />;
  }
  if (!partner) {
    return (
      <div className="flex items-center justify-between">
        <div>Not found</div>
        <ButtonBack link={ROUTES.ADMIN.PARTNERS} />
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p>Partner ID: #{partner?.id}</p>
          <span
            className={`text-xs font-bold ${
              partner?.status === PartnerStatus.ACCEPTED
                ? 'text-green-800'
                : partner?.status === PartnerStatus.PENDING
                ? 'text-yellow-800'
                : 'text-gray-800'
            }`}
          >
            {partner?.status}
          </span>
        </div>
        <ButtonBack link={ROUTES.ADMIN.PARTNERS} />
      </div>
      <div className="pt-4">
        {partner && (
          <div className="flex justify-between w-full p-4 border">
            <div className="space-y-2">
              <div className="flex gap-1">
                <p className="font-semibold">Full Name:</p>
                <p>{partner.fullName}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Email:</p>
                <p>{partner.email}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Gender:</p>
                <p>{partner.gender}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Phone:</p>
                <p>{partner.phoneNumber}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Birth:</p>
                <p>{format(partner.birth, 'dd/MM/yyyy')}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex gap-1">
                <p className="font-semibold">ID Card:</p>
                <p>{partner.idCard}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Company Name:</p>
                <p>{partner.companyName}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Account Number:</p>
                <p>{partner.accountNumber}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Bank Account:</p>
                <p>{partner.bankAccount}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Bank Name:</p>
                <p>{partner.bankName}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex gap-1">
                <p className="font-semibold">Province:</p>
                <p>
                  {
                    provinceList?.find(
                      (item) => item.code === partner?.provinceCode,
                    )?.name
                  }
                </p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">District:</p>
                <p>
                  {
                    districtList?.find(
                      (item) => item.code === partner?.districtCode,
                    )?.name
                  }
                </p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Ward:</p>
                <p>
                  {
                    wardList?.find((item) => item.code === partner?.wardCode)
                      ?.name
                  }
                </p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Address:</p>
                <p>{partner.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="pt-4">
        <div className="flex items-center gap-2">
          <p>Hotel ID: #{hotel?.id}</p>
          <span
            className={`text-xs font-bold ${
              hotel?.status === HOTEL_STATUS.ACTIVE
                ? 'text-green-800'
                : hotel?.status === HOTEL_STATUS.PENDING
                ? 'text-yellow-800'
                : hotel?.status === HOTEL_STATUS.INACTIVE
                ? 'text-red-800'
                : 'text-gray-800'
            }`}
          >
            {hotel?.status}
          </span>
        </div>
        <div className="pt-4">
          <Carousel className="w-full cursor-grab">
            <CarouselContent className="-ml-1">
              {hotel?.images?.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                      fill
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
          <div className="flex justify-between pt-4">
            <div className="space-y-2 w-1/2">
              <div className="flex gap-1">
                <p className="font-semibold">Name:</p>
                <p>{hotel?.name}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Phone:</p>
                <p>{hotel?.hotelPhoneNumber}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Type:</p>
                <p>{hotel?.type}</p>
              </div>
              <div className="flex gap-5">
                <div className="flex gap-1">
                  <p className="font-semibold">Reputation:</p>
                  <p>{hotel?.reputationScore}</p>
                </div>
                <div className="flex gap-1">
                  <p className="font-semibold">VAT:</p>
                  <p>{hotel?.vat ? hotel.vat * 100 : 0}%</p>
                </div>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Province:</p>
                <p>
                  {
                    provinceList?.find(
                      (item) => item.code === hotel?.provinceCode,
                    )?.name
                  }
                </p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">District:</p>
                <p>
                  {
                    districtListHotel?.find(
                      (item) => item.code === hotel?.districtCode,
                    )?.name
                  }
                </p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Ward:</p>
                <p>
                  {
                    wardListHotel?.find((item) => item.code === hotel?.wardCode)
                      ?.name
                  }
                </p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Address:</p>
                <p>{hotel?.address}</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold">Description:</p>
              <p className="text-sm">{hotel?.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4 flex justify-end gap-5">
        {partner?.status === PartnerStatus.PENDING && (
          <>
            <Button
              disabled={isSubmitting || statusSubmit === PartnerStatus.REJECTED}
              variant="destructive"
              className="w-[120px] h-10 relative"
              onClick={() =>
                handleUpdateStatusPartner({
                  userId: partner?.userId as number,
                  status: PartnerStatus.REJECTED,
                })
              }
            >
              {statusSubmit === PartnerStatus.REJECTED ? (
                <LoadingButton />
              ) : (
                'Reject'
              )}
            </Button>
            <Button
              disabled={isSubmitting || statusSubmit === PartnerStatus.ACCEPTED}
              className="w-[120px] h-10 relative"
              onClick={() =>
                handleUpdateStatusPartner({
                  userId: partner?.userId as number,
                  status: PartnerStatus.ACCEPTED,
                })
              }
            >
              {statusSubmit === PartnerStatus.ACCEPTED ? (
                <LoadingButton />
              ) : (
                'Accept'
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PartnerPageDetail;
