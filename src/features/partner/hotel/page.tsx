'use client';
import React from 'react';
import {
  AddressSelection,
  Loading,
  LoadingButton,
  MultipleUploading,
  RHFInput,
  RHFSelection,
} from '@/components';
import { HOTEL_STATUS, HOTEL_TYPE_LIST } from '@/constants';
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { usePartnerHotelPage } from './hooks/usePartnerHotelPage';

const PartnerHotelPage = () => {
  const { form, hotel, handleUpdateHotel, isSubmitting, uploader } =
    usePartnerHotelPage();
  if (!hotel) {
    return <Loading />;
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <p>Hotel ID: #{hotel?.id}</p>
        <span
          className={`text-xs font-bold ${
            hotel?.status === HOTEL_STATUS.ACTIVE
              ? 'text-green-600'
              : hotel?.status === HOTEL_STATUS.PENDING
              ? 'text-yellow-600'
              : hotel?.status === HOTEL_STATUS.INACTIVE
              ? 'text-red-600'
              : 'text-gray-600'
          }`}
        >
          {hotel?.status}
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateHotel)}
          className="space-y-4 h-max"
        >
          <div className="h-max">
            <MultipleUploading
              maxNumber={10}
              className="h-max"
              uploader={uploader}
              isButton={false}
              initialImages={
                hotel?.images.map((image: string) => ({
                  dataURL: image,
                  isExist: true,
                  file: null,
                })) || []
              }
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between gap-4">
              <RHFInput
                form={form}
                name="name"
                label="Name"
                className="w-1/2"
              />
              <RHFInput
                form={form}
                name="hotelPhoneNumber"
                label="Phone"
                className="w-1/2"
              />
            </div>
            <div className="flex justify-between gap-4">
              <RHFSelection
                form={form}
                label="Type"
                name="type"
                list={HOTEL_TYPE_LIST}
                className="w-1/3"
                isSearch
              />
              <RHFInput
                form={form}
                label="VAT (%)"
                name="vat"
                type="number"
                min={0}
                className="w-1/3"
              />
              <RHFInput
                form={form}
                name="reputationScore"
                label="Reputation"
                disabled
                className="w-1/3"
              />
            </div>
            <AddressSelection form={form} />
            <RHFInput form={form} label="Address" name="address" required />
            <div className="">
              <div className="flex items-start gap-4">
                <RHFInput
                  form={form}
                  label="Latitude"
                  name="lat"
                  required
                  placeholder="Enter your latitude"
                  className="w-1/2"
                  type="number"
                />
                <RHFInput
                  form={form}
                  label="Longitude"
                  name="lon"
                  required
                  placeholder="Enter your longitude"
                  className="w-1/2"
                  type="number"
                />
              </div>
            </div>
            <RHFInput
              form={form}
              label="Hotel Description"
              name="description"
              required
              placeholder="Enter your hotel description"
              renderProp={(props: any, field: any) => (
                <div className="grid gap-1">
                  <FormLabel
                    className="block text-sm font-medium text-gray-700"
                    htmlFor={props.name}
                  >
                    {props.label}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      onChange={field.onChange}
                      value={field.value}
                      className="h-full"
                      {...props}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
          </div>
          {hotel?.status === HOTEL_STATUS.ACTIVE && (
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-[120px] h-10 relative"
              >
                {isSubmitting ? <LoadingButton /> : 'Save'}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default PartnerHotelPage;
