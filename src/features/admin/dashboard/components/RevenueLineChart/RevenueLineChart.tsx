'use client';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
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
import { format, parse } from 'date-fns';
import { formatCurrency } from '@/lib/utils';
const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--color-primary))',
  },
} satisfies ChartConfig;

const RevenueLineChart = ({
  chartData,
}: {
  chartData: { date: string; revenue: number }[];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        <CardDescription className="text-xs"></CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 12,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              tickFormatter={(value) => {
                if (chartData.length < 8) {
                  const date = parse(value, 'yyyy-MM-dd', new Date());
                  return format(date, 'dd');
                }
                if (chartData.length < 33) {
                  const date = parse(value, 'yyyy-MM-dd', new Date());
                  return format(date, 'dd/MM');
                }
                return '';
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <YAxis
              dataKey="revenue"
              axisLine={false}
              tickLine={false}
              orientation="left"
              tickFormatter={(value) => formatCurrency(value, 'NOT_VND')}
              width={60}
            />
            <Line
              dataKey="revenue"
              type="linear"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueLineChart;
