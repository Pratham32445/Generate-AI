"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const TodayDate = new Date().getDate();

const chartData = Array.from({ length: TodayDate }).map((_, idx) => ({
  count: Math.floor(Math.random() * 100),
  date: idx + 1,
}));

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Component() {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <CardTitle>Image Generated During this Month</CardTitle>
        </CardHeader>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 10,
            }}
            data={chartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={5} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="count"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
