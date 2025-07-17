import { useAccountOrderPage } from './hooks/useAccountOrderPage';
import { AccountOrderItem } from '@/features/account/pages/order/components';
import { CPagination, RHFInput, RHFPickDate } from '@/components';
import { Form } from '@/components/ui/form';
import { addDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import AccountOrderItemView from '@/features/account/pages/order/components/AccountOrderItemView/AccountOrderItemView';
import { AccountOrderItemReview } from '@/features/account/pages/order/components/AccountOrderItemReview';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MAP_ORDER_STATUS,
  MAP_PAYMENT_TYPE,
  ORDER_STATUS_LIST,
  PAYMENT_TYPE_LIST,
} from '@/constants';

const AccountOrderPage = () => {
  const {
    orders,
    isLoading,
    pagination,
    formQuery,
    onDateFromChange,
    onDateToChange,
    dateFromValue,
    onReset,
    open,
    setOpen,
    selectedOrder,
    onOpenModal,
    openReview,
    onCloseReview,
    onOpenReview,
    onStatusChange,
    onPaymentTypeChange,
  } = useAccountOrderPage();
  if (!orders) return null;
  return (
    <div>
      <Form {...formQuery}>
        {selectedOrder && (
          <AccountOrderItemView
            open={open}
            onOpenChange={setOpen}
            selectedOrder={selectedOrder}
          />
        )}
        {selectedOrder && (
          <AccountOrderItemReview
            selectedOrder={selectedOrder}
            open={openReview}
            onOpenChange={onCloseReview}
          />
        )}
        <div className="flex pb-5 justify-between items-center">
          <div className="flex items-center w-[520px] gap-2">
            <RHFInput
              form={formQuery}
              name="dateFrom"
              placeholder="Checkin"
              required
              className="w-full"
              renderProp={(props: any, field: any) => (
                <RHFPickDate
                  field={field}
                  {...props}
                  disabled={false}
                  className="!h-9"
                  onChange={onDateFromChange}
                />
              )}
            />
            <RHFInput
              form={formQuery}
              name="dateTo"
              placeholder="Checkout"
              required
              className="w-full"
              renderProp={(props: any, field: any) => (
                <RHFPickDate
                  field={field}
                  {...props}
                  disabled={(date) =>
                    dateFromValue && date < addDays(dateFromValue, 1)
                  }
                  className="!h-9"
                  onChange={onDateToChange}
                  disabledInput={!dateFromValue}
                />
              )}
            />
          </div>
          <div className="flex justify-end">
            <div className="flex items-center gap-2">
              <RHFInput
                form={formQuery}
                name="paymentType"
                renderProp={(props: any, field: any) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      onPaymentTypeChange();
                    }}
                    value={field.value}
                    {...props}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Payment" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYMENT_TYPE_LIST.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {
                            MAP_PAYMENT_TYPE[
                              item.label as keyof typeof MAP_PAYMENT_TYPE
                            ]
                          }
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <RHFInput
                form={formQuery}
                name="status"
                placeholder="Status"
                renderProp={(props: any, field: any) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      onStatusChange();
                    }}
                    value={field.value}
                    {...props}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {ORDER_STATUS_LIST.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {
                            MAP_ORDER_STATUS[
                              item.label as keyof typeof MAP_ORDER_STATUS
                            ]
                          }
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <Button onClick={onReset}>Reset</Button>
            </div>
          </div>
        </div>
        {orders?.data.map((order) => (
          <AccountOrderItem
            key={order.id}
            order={order}
            onViewDetails={onOpenModal}
            onOpenReview={onOpenReview}
          />
        ))}
        {!isLoading && (
          <CPagination
            currentPage={pagination?.page as number}
            totalPages={pagination?.totalPages as number}
            totalItems={pagination?.totalItems as number}
            itemsPerPage={pagination?.limit as number}
          />
        )}
      </Form>
    </div>
  );
};

export default AccountOrderPage;
