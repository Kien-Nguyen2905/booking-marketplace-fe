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
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--color-primary))',
  },
} satisfies ChartConfig;

const PartnerProfitLineChart = ({
  chartData,
}: {
  chartData: { date: string; profit: number }[];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Partner Profit</CardTitle>
        <CardDescription className="text-xs"></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
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
            <Line
              dataKey="profit"
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

export default PartnerProfitLineChart;
