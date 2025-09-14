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
import { usePartnerHotelInformation } from './usePartnerHotelInformation';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useUploadMultipleImages } from '@/hooks';

const PartnerHotelInformation = () => {
  const uploader = useUploadMultipleImages(3);

  const { form, isLoadingPartner, handleCreateHotel, isLoading } =
    usePartnerHotelInformation(uploader);

  if (isLoadingPartner) return <Loading />;

  return (
    <div className="w-full">
      <Card className="border-0 shadow-none">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateHotel)}
              className="space-y-6"
            >
              <div className="grid gap-3 lg:gap-6">
                <div className="flex w-full gap-3 flex-col lg:flex-row items-start lg:gap-4">
                  <RHFInput
                    form={form}
                    label="Hotel Name"
                    name="name"
                    required
                    placeholder="Enter your hotel name"
                    className="w-full"
                  />
                  <RHFInput
                    form={form}
                    label="Hotel Phone"
                    name="hotelPhoneNumber"
                    required
                    placeholder="Enter your hotel phone"
                    className="w-full"
                  />
                </div>
                <div className="flex w-full gap-3 flex-col lg:flex-row items-start lg:gap-4">
                  <RHFSelection
                    form={form}
                    label="Type"
                    name="type"
                    list={HOTEL_TYPE_LIST}
                    placeholder="Enter your hotel type"
                    required
                    className="w-full lg:w-1/2"
                    isSearch
                  />
                  <RHFInput
                    form={form}
                    label="VAT (%)"
                    name="vat"
                    required
                    className="w-full lg:w-1/2"
                    type="number"
                    min={0}
                  />
                </div>
                <RHFInput
                  form={form}
                  label="Hotel Description"
                  name="description"
                  placeholder="Enter your hotel description"
                  renderProp={(props: any, field: any) => (
                    <div className="grid gap-1">
                      <FormLabel
                        className="block text-sm font-medium text-gray-700"
                        htmlFor={props.name}
                      >
                        {props.label}
                        <RequiredField required={true} />
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
                <AddressSelection required form={form} />
                <RHFInput
                  form={form}
                  label="Address"
                  name="address"
                  required
                  placeholder="Enter your address"
                />
                <div className="flex w-full gap-3 flex-col lg:gap-4">
                  <RHFInput
                    form={form}
                    label="Latitude"
                    name="lat"
                    required
                    placeholder="Enter your latitude"
                    className="w-full"
                    type="number"
                  />
                  <RHFInput
                    form={form}
                    label="Longitude"
                    name="lon"
                    required
                    placeholder="Enter your longitude"
                    className="w-full"
                    type="number"
                  />

                  <Link
                    href="https://www.google.com/maps/place"
                    target="_blank"
                  >
                    <Button
                      type="button"
                      variant="link"
                      className="text-[10px] lg:text-base pl-0"
                    >
                      Get the latitude and longitude of your hotel with Google
                      Maps
                    </Button>
                  </Link>
                </div>
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
