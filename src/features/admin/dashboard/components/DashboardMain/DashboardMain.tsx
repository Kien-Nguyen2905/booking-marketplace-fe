'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { addDays } from 'date-fns';
import { RevenueLineChart } from '@/features/admin/dashboard/components/RevenueLineChart';
import { DishBarChart } from '@/features/admin/dashboard/components/DishBarChart';
import useDashboardMain from '@/features/admin/dashboard/hooks/useDashboardMain';
import { RHFInput, RHFPickDate } from '@/components';
import { Form } from '@/components/ui/form';
import { ProfitLineChart } from '@/features/admin/dashboard/components/ProfitLineChart';
import { PartnerProfitLineChart } from '@/features/admin/dashboard/components/PartnerProfitLineChart';
import { CalendarPlus, DollarSign, Percent, UserRound } from 'lucide-react';

const AdminDashboardMain = () => {
  const {
    form,
    onDateFromChange,
    onDateToChange,
    onReset,
    metric,
    dateFromValue,
  } = useDashboardMain();
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
            <CardTitle className="text-sm font-medium">Partner</CardTitle>
            <UserRound size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(metric?.totalPartnerProfit as number)}
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
              {formatCurrency(metric?.totalPlatformProfit as number)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Booked</CardTitle>
            <CalendarPlus size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metric?.totalBooked as number}
            </div>
            <p className="text-xs text-muted-foreground">Order</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <div className="lg:col-span-4">
          <RevenueLineChart chartData={metric?.totalRevenueInRange as any} />
        </div>
        <div className="lg:col-span-4">
          <DishBarChart chartData={metric?.hotels as any} />
        </div>
        <div className="lg:col-span-4">
          <ProfitLineChart
            chartData={metric?.totalPlatformProfitInRange as any}
          />
        </div>
        <div className="lg:col-span-4">
          <PartnerProfitLineChart
            chartData={metric?.totalPartnerProfitInRange as any}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardMain;
