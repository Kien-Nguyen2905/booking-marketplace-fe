'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { addDays } from 'date-fns';
import { RHFInput, RHFPickDate } from '@/components';
import { Form } from '@/components/ui/form';
import { usePartnerDashboardPage } from '@/features/partner/dashboard/hooks';
import { PartnerDishBarChart } from '@/features/partner/dashboard/components/PartnerDishBarChart';
import { PartnerProfitLineChart } from '@/features/partner/dashboard/components/PartnerProfitLineChart';
import {
  CalendarCheck,
  CalendarClock,
  CalendarOff,
  CalendarPlus,
  CalendarSync,
  DollarSign,
  Percent,
} from 'lucide-react';

const PartnerDashboardMain = () => {
  const {
    form,
    onDateFromChange,
    onDateToChange,
    onReset,
    metric,
    dateFromValue,
  } = usePartnerDashboardPage();
  return (
    <div className="space-y-4">
      <Form {...form}>
        <div className="flex w-[590px] items-center gap-2 pb-5">
          <RHFInput
            form={form}
            name="dateFrom"
            placeholder="Date from"
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
            form={form}
            name="dateTo"
            placeholder="Date to"
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
          <Button variant="default" onClick={onReset}>
            Reset
          </Button>
        </div>
      </Form>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(metric?.totalRevenue as number)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit</CardTitle>
            <Percent size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(metric?.totalProfit as number)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Booked</CardTitle>
            <CalendarPlus size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric?.totalBooked}</div>
            <p className="text-xs text-muted-foreground">Order</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Checkout</CardTitle>
            <CalendarCheck size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric?.totalCheckout}</div>
            <p className="text-xs text-muted-foreground">Order</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Canceled</CardTitle>
            <CalendarOff size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric?.totalCanceled}</div>
            <p className="text-xs text-muted-foreground">Order</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refunded</CardTitle>
            <CalendarSync size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric?.totalRefunded}</div>
            <p className="text-xs text-muted-foreground">Order</p>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">No show</CardTitle>
            <CalendarClock size={16} />
          </CardHeader>
          <CardContent className="flex justify-between items-end">
            <div className="flex flex-col">
              <div className="text-2xl font-bold">
                {metric?.totalNoShowBanking}
              </div>
              <p className="text-xs text-muted-foreground">Order Banking</p>
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-bold">
                {metric?.totalNoShowPayAtHotel}
              </div>
              <p className="text-xs text-muted-foreground">
                Order Pay at hotel
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <div className="lg:col-span-4">
          <PartnerProfitLineChart
            chartData={metric?.totalProfitInRange as any}
          />
        </div>
        <div className="lg:col-span-4">
          <PartnerDishBarChart chartData={metric?.roomTypes as any} />
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboardMain;
