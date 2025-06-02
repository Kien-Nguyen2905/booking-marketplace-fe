'use client';
import {
  ButtonBack,
  LoadingButton,
  MultipleUploading,
  RequiredField,
  RHFInput,
} from '@/components';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ChevronsUpDown, Trash2 } from 'lucide-react';
import React from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { ROOM_BED_TYPE_LIST, ROUTES } from '@/constants';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { usePartnerCreateRoomTypesPage } from '@/features/partner/room-types/hooks';
import { DialogRoomQuantity } from '@/features/partner/room-types/components';

const PartnerCreateRoomTypesPage = () => {
  const {
    form,
    uploader,
    openAmenity,
    setOpenAmenity,
    openRoom,
    setOpenRoom,
    roomBeds,
    amenities,
    onAddAmenity,
    onRemoveAmenity,
    availableAmenities,
    handleCreateRoomType,
    isSubmitting,
    searchValue,
    dialogRoomQuantityProps,
    onRemoveRoomBed,
    onSelectRoomBed,
  } = usePartnerCreateRoomTypesPage();

  return (
    <div className="">
      <div className="flex items-center justify-end">
        <ButtonBack link={ROUTES.PARTNER.ROOM_TYPES} />
      </div>
      <div className="pb-20">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateRoomType, (error) => {
              console.log(error);
            })}
          >
            <div className="space-y-4">
              <RHFInput
                name="type"
                required
                form={form}
                label="Type"
                placeholder="Enter your room type"
              />
              <div className="flex gap-4 items-start">
                <RHFInput
                  name="adults"
                  required
                  form={form}
                  label="Adults"
                  className="w-1/2"
                  type="number"
                  min={1}
                />
                <RHFInput
                  name="child"
                  required
                  form={form}
                  label="Child"
                  className="w-1/2"
                  type="number"
                  min={0}
                />
              </div>
              <div className="flex gap-4 items-start">
                <RHFInput
                  name="area"
                  required
                  form={form}
                  label="Area (m2)"
                  className="w-1/2"
                  type="number"
                />
                <RHFInput
                  name="serviceFeeRate"
                  required
                  form={form}
                  label="Service Fee Rate (%)"
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
              <MultipleUploading
                maxNumber={10}
                className="h-max"
                uploader={uploader}
                isButton={false}
                label="Room Images"
                initialImages={
                  form.getValues('images').map((image: string) => ({
                    dataURL: image,
                    isExist: true,
                    file: null,
                  })) || []
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <Popover open={openRoom} onOpenChange={setOpenRoom}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openRoom}
                      className="w-full justify-between h-12"
                    >
                      Select bedroom
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full md:w-72 p-0">
                    <Command>
                      <CommandEmpty>Not found.</CommandEmpty>
                      <CommandGroup className="max-h-72 overflow-auto">
                        {ROOM_BED_TYPE_LIST.map((room) => (
                          <CommandItem
                            key={room.value}
                            value={room.value}
                            onSelect={(currentValue) => {
                              onSelectRoomBed(currentValue);
                            }}
                            className="w-full flex justify-between cursor-pointer"
                          >
                            <span className="capitalize">{room.label}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Popover open={openAmenity} onOpenChange={setOpenAmenity}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openAmenity}
                      className="w-full justify-between h-12"
                    >
                      {searchValue
                        ? amenities.find(
                            (amenity) => amenity.name === searchValue,
                          )?.name
                        : 'Select amenity'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full md:w-72 p-0">
                    <Command>
                      <CommandInput placeholder="Search..." />
                      <CommandEmpty>Not found.</CommandEmpty>
                      <CommandGroup className="max-h-72 overflow-auto">
                        {availableAmenities.map((amenity) => (
                          <CommandItem
                            key={amenity.id}
                            value={amenity.name}
                            onSelect={() => {
                              onAddAmenity(amenity);
                            }}
                            className="w-full flex justify-between cursor-pointer"
                          >
                            <span>{amenity.name}</span>
                            <span className="w-[70px] text-sm text-muted-foreground">
                              {amenity.category}
                            </span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                {/* Display Selected Rooms in a Table */}
                {roomBeds.length > 0 ? (
                  <div className="border rounded-lg h-max p-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-1/2">Bedroom</TableHead>
                          <TableHead className="w-1/2">Quantity</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {roomBeds.map((room, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium capitalize">
                              {room.roomBedType.toLowerCase()}
                            </TableCell>
                            <TableCell>{room.quantity}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  onRemoveRoomBed(index);
                                }}
                                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className=""></div>
                )}
                {amenities.length > 0 && (
                  <div className="border rounded-lg h-max p-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-1/2">Name</TableHead>
                          <TableHead className="w-1/2">Type</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {amenities.map((amenity) => (
                          <TableRow key={amenity.id}>
                            <TableCell className="flex items-center gap-2">
                              {amenity.name}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{amenity.category}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onRemoveAmenity(amenity.id)}
                                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
              <DialogRoomQuantity {...dialogRoomQuantityProps} />
            </div>
            <div className="flex justify-end mt-10">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-[110px] h-10 relative"
              >
                {isSubmitting ? <LoadingButton /> : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PartnerCreateRoomTypesPage;
