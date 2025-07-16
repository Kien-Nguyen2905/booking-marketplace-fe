'use client';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useMemo } from 'react';
const colors = [
  'var(--color-primary)',
  'var(--color-primary)',
  'var(--color-primary)',
  'var(--color-primary)',
  'var(--color-primary)',
];
const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--color-primary)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--color-primary)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--color-primary)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--color-primary)',
  },
  other: {
    label: 'Other',
    color: 'var(--color-primary)',
  },
} satisfies ChartConfig;

const DishBarChart = ({
  chartData,
}: {
  chartData: { hotelName: string; bookings: number }[];
}) => {
  const chartDateColors = useMemo(
    () =>
      chartData?.map((data, index) => {
        return {
          ...data,
          fill: colors[index] ?? colors[colors.length - 1],
        };
      }),
    [chartData],
  );
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Ranking Hotels</CardTitle>
        <CardDescription className="text-xs">
          The ranking of hotels based on the number of orders
        </CardDescription>
      </CardHeader>
      <CardContent className="my-auto">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartDateColors}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="hotelName"
              type="category"
              tickLine={false}
              tickMargin={2}
              axisLine={false}
              width={90}
              tickFormatter={(value) => {
                return value;
              }}
            />
            <XAxis dataKey="bookings" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="bookings"
              name={'Orders'}
              layout="vertical"
              radius={5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
export default DishBarChart;
