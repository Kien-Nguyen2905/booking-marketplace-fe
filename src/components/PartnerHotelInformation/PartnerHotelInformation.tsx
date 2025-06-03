'use client';
import {
  AddressSelection,
  Loading,
  LoadingButton,
  MultipleUploading,
  RequiredField,
  RHFInput,
  RHFSelection,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { HOTEL_TYPE_LIST } from '@/constants';
import React from 'react';
import { usePartnerHotelInformation } from './usePartnerHotelInformation';
import { Textarea } from '@/components/ui/textarea';

const PartnerHotelInformation = () => {
  const { form, isLoadingPartner, handleCreateHotel, isLoading, uploader } =
    usePartnerHotelInformation();

  if (isLoadingPartner) return <Loading />;

  return (
    <div>
      <Card className="border-0 shadow-none">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateHotel, (errors) =>
                console.log('Form validation errors:', errors),
              )}
              className="space-y-6"
            >
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <RHFInput
                    form={form}
                    label="Hotel Name"
                    name="name"
                    required
                    placeholder="Enter your hotel name"
                    className="w-1/2"
                  />
                  <RHFInput
                    form={form}
                    label="Hotel Phone"
                    name="hotelPhoneNumber"
                    required
                    placeholder="Enter your hotel phone"
                    className="w-1/2"
                  />
                </div>
                <div className="flex items-start gap-4">
                  <RHFSelection
                    form={form}
                    label="Type"
                    name="type"
                    list={HOTEL_TYPE_LIST}
                    placeholder="Enter your hotel type"
                    required
                    className="w-1/2"
                    isSearch
                  />
                  <RHFInput
                    form={form}
                    label="VAT (%)"
                    name="vat"
                    required
                    className="w-1/2"
                    type="number"
                    min={0}
                  />
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
                        <RequiredField required={props.required} />
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          onChange={field.onChange}
                          value={field.value}
                          className="h-24"
                          {...props}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  )}
                />
                <RHFInput
                  form={form}
                  label="Address"
                  name="address"
                  required
                  placeholder="Enter your address"
                />
                <AddressSelection form={form} />
                <MultipleUploading
                  label="Hotel Images"
                  description="Upload at least 3 images"
                  placeholder="Upload hotel images"
                  required
                  maxNumber={5}
                  uploader={uploader}
                  className="h-40"
                />
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="min-w-[120px] h-12 relative"
                >
                  {isLoading ? <LoadingButton /> : 'Save'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerHotelInformation;
