'use client';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
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
const chartConfig = {
  platformProfit: {
    label: 'Platform ',
    color: 'var(--chart-1)',
  },
  partnerProfit: {
    label: 'Partner ',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const OverlappingLineChart = ({
  platformProfitData,
  partnerProfitData,
}: {
  platformProfitData: { date: string; profit: number }[];
  partnerProfitData: { date: string; partnerProfit: number }[];
}) => {
  const chartData = platformProfitData?.map((platformItem) => {
    const partnerItem = partnerProfitData.find(
      (m) => m.date === platformItem.date,
    );
    return {
      date: platformItem.date,
      platformProfit: platformItem.profit,
      partnerProfit: partnerItem?.partnerProfit ?? 0,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform & Partner Profit</CardTitle>
        {chartData?.length > 0 && (
          <CardDescription className="text-xs">
            {chartData?.[0].date} - {chartData?.[chartData.length - 1].date}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 12,
              left: 12,
              right: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
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

            <Line
              dataKey="partnerProfit"
              type="monotone"
              stroke="var(--color-partnerProfit)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="platformProfit"
              type="monotone"
              stroke="var(--color-platformProfit)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default OverlappingLineChart;
